import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth.js";

export default function Layout({ title, children }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <div className="app-orbs" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="app-main">
        <header className="app-nav">
          <h1>PokéDex Secure</h1>
          <nav className="app-nav-links" aria-label="Principal">
            <Link to="/home">Inicio</Link>
            <Link to="/filtrar">Filtrar</Link>
          </nav>
          <button
            type="button"
            className="app-btn-logout"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </header>
        <h2 className="app-page-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
