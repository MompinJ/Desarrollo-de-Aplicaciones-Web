import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const NICK_KEY = "chatmsg_nickname";

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

export default function App() {
  const [nickname, setNickname] = useState(() =>
    sessionStorage.getItem(NICK_KEY) || ""
  );
  const [joined, setJoined] = useState(false);
  const [inputNick, setInputNick] = useState(nickname);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [usersOnline, setUsersOnline] = useState(0);
  const listRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!joined) return;

    const socket = io({
      path: "/socket.io",
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("Conectado");
      socket.emit("join", { nickname }, (res) => {
        if (res && !res.ok) setStatus("Error al unirse");
      });
    });

    socket.on("connect_error", () => {
      setStatus("No se pudo conectar al servidor");
    });

    socket.on("disconnect", () => {
      setStatus("Desconectado");
    });

    socket.on("message", (msg) => {
      setMessages((prev) => mergeById(prev, [msg]));
    });

    socket.on("presence", (p) => {
      if (typeof p?.usersOnline === "number") setUsersOnline(p.usersOnline);
    });

    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages((prev) => mergeById(prev, data));
      })
      .catch(() => {});

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [joined, nickname]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleJoin = useCallback(
    (e) => {
      e.preventDefault();
      const n = inputNick.trim().slice(0, 32);
      if (!n) return;
      sessionStorage.setItem(NICK_KEY, n);
      setNickname(n);
      setJoined(true);
    },
    [inputNick]
  );

  const send = useCallback(
    (e) => {
      e.preventDefault();
      const text = draft.trim();
      if (!text || !socketRef.current?.connected) return;
      socketRef.current.emit("message", { text });
      setDraft("");
    },
    [draft]
  );

  if (!joined) {
    return (
      <div className="layout layout--center">
        <form className="card" onSubmit={handleJoin}>
          <h1 className="title">Chat (Fase 1)</h1>
          <p className="subtitle">Elige un nombre para entrar al chat.</p>
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
          <span>{usersOnline} en línea</span>
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
