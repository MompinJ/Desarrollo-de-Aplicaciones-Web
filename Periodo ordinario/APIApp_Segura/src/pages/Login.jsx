import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../api/auth.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { ok, data } = await login(username, password);
    setLoading(false);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError(data?.message || "No pudimos validar tus datos");
    }
  }

  return (
    <div className="app-shell app-shell--centered">
      <div className="app-orbs" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-badge" aria-hidden="true" />
          <div className="login-brand">
            <h1>PokéDex Secure</h1>
            <p>Tu pase al mundo Pokémon</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="user">Entrenador</label>
              <input
                id="user"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div className="login-field">
              <label htmlFor="pass">Clave</label>
              <input
                id="pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error ? <p className="error">{error}</p> : null}
            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? "Abriendo la Poké Ball…" : "¡A entrar!"}
            </button>
          </form>
          <div className="login-footer">
            <Link to="/home">Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
