import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "../api/auth.js";

export default function SecureRoute({ children }) {
  const [status, setStatus] = useState("checking");
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { ok } = await getSession();
      if (!cancelled) setStatus(ok ? "ok" : "no");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="app-shell app-shell--centered">
        <div className="app-orbs" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="login-wrap">
          <div className="glass-card session-check" aria-live="polite">
            Comprobando sesión…
          </div>
        </div>
      </div>
    );
  }

  if (status === "no") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
