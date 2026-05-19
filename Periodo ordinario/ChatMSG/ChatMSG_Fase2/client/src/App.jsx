import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString("es", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function mergeById(prev, incoming) {
  const map = new Map(prev.map((m) => [m.id, m]));
  for (const m of incoming) map.set(m.id, m);
  return [...map.values()].sort((a, b) => a.ts - b.ts);
}

async function fetchMe() {
  const r = await fetch("/api/me", { credentials: "include" });
  if (!r.ok) return null;
  return r.json();
}

export default function App() {
  const [nickname, setNickname] = useState("");
  const [sessionChecked, setSessionChecked] = useState(false);
  const [joined, setJoined] = useState(false);
  const [inputNick, setInputNick] = useState("");
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [usersOnline, setUsersOnline] = useState(0);
  const [serverId, setServerId] = useState("");
  const listRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    fetchMe()
      .then((data) => {
        if (data?.nickname) {
          setNickname(data.nickname);
          setJoined(true);
        }
      })
      .finally(() => setSessionChecked(true));
  }, []);

  useEffect(() => {
    if (!joined || !sessionChecked) return;

    const socket = io({
      path: "/socket.io",
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("Conectado");
    });

    socket.on("connect_error", (err) => {
      setStatus(
        err?.message === "invalid_session" || err?.message === "no_session"
          ? "Sesión inválida: entra de nuevo"
          : "No se pudo conectar (¿servidor o cookie?)"
      );
    });

    socket.on("disconnect", () => {
      setStatus("Desconectado");
    });

    socket.on("chat:message", (msg) => {
      setMessages((prev) => mergeById(prev, [msg]));
    });

    socket.on("presence", (p) => {
      if (typeof p?.usersOnline === "number") setUsersOnline(p.usersOnline);
      if (p?.serverId) setServerId(p.serverId);
    });

    fetch("/api/messages", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages((prev) => mergeById(prev, data));
      })
      .catch(() => {});

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [joined, sessionChecked]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleJoin = useCallback(
    async (e) => {
      e.preventDefault();
      const n = inputNick.trim().slice(0, 32);
      if (!n) return;
      const r = await fetch("/api/session", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: n }),
      });
      if (!r.ok) return;
      const data = await r.json();
      setNickname(data.nickname);
      setJoined(true);
    },
    [inputNick]
  );

  const logout = useCallback(async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setJoined(false);
    setNickname("");
    setMessages([]);
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  const send = useCallback(
    (e) => {
      e.preventDefault();
      const text = draft.trim();
      if (!text) return;
      const s = socketRef.current;
      if (!s?.connected) {
        setStatus("Sin conexión: espera \"Conectado\" o recarga la página.");
        return;
      }
      s.emit("chat:send", { text });
      setDraft("");
    },
    [draft]
  );

  if (!sessionChecked) {
    return (
      <div className="layout layout--center">
        <p className="subtitle">Cargando…</p>
      </div>
    );
  }

  if (!joined) {
    return (
      <div className="layout layout--center">
        <form className="card" onSubmit={handleJoin}>
          <h1 className="title">Chat (Fase 2)</h1>
          <p className="subtitle">
            Elige un nombre. La sesión usa cookie httpOnly (sin Redis para
            identidad).
          </p>
          <label className="label" htmlFor="nick">
            Nombre
          </label>
          <input
            id="nick"
            className="input"
            value={inputNick}
            onChange={(e) => setInputNick(e.target.value)}
            placeholder="Tu nombre"
            maxLength={32}
            autoComplete="username"
            autoFocus
          />
          <button type="submit" className="btn btn--primary">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="layout">
      <header className="header">
        <div>
          <h1 className="title title--inline">Chat</h1>
          <span className="badge">{nickname}</span>
        </div>
        <div className="meta">
          <span>{status}</span>
          <span className="dot" aria-hidden />
          <span>{usersOnline} en línea (esta instancia)</span>
          {serverId ? (
            <>
              <span className="dot" aria-hidden />
              <span className="meta-code" title="Socket.IO en este servidor">
                {serverId}
              </span>
            </>
          ) : null}
          <button type="button" className="btn-link" onClick={logout}>
            Salir
          </button>
        </div>
      </header>

      <main className="chat">
        <ul className="messages" ref={listRef} aria-live="polite">
          {messages.map((m) => (
            <li
              key={m.id}
              className={
                m.nickname === nickname ? "msg msg--self" : "msg"
              }
            >
              <span className="msg__nick">{m.nickname}</span>
              {m.origin ? (
                <span className="msg__origin" title="Servidor origen">
                  {" "}
                  · {m.origin}
                </span>
              ) : null}
              <span className="msg__time">{formatTime(m.ts)}</span>
              <p className="msg__text">{m.text}</p>
            </li>
          ))}
        </ul>

        <form className="composer" onSubmit={send}>
          <input
            className="input input--grow"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Escribe un mensaje…"
            maxLength={2000}
            autoFocus
          />
          <button type="submit" className="btn btn--primary" disabled={!draft.trim()}>
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
