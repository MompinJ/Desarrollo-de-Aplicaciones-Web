import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPokemonById } from "../api/pokeApi.js";
import Layout from "../components/Layout.jsx";

export default function Detalles() {
  const { id } = useParams();
  const [poke, setPoke] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setPoke(null);
      setError("");
      try {
        const json = await fetchPokemonById(id);
        if (!cancelled) setPoke(json);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <Layout title="Detalle">
      <Link to="/home" className="app-back-link">
        ← Volver al listado
      </Link>
      {error ? <p className="error">{error}</p> : null}
      {!poke && !error ? <div className="loading">Cargando…</div> : null}
      {poke ? (
        <div className="glass-card detail-layout">
          <img
            src={
              poke.sprites?.other?.["official-artwork"]?.front_default ||
              poke.sprites?.front_default
            }
            alt={poke.name}
            width={200}
            height={200}
            style={{
              imageRendering: "pixelated",
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
            }}
          />
          <div className="detail-meta">
            <h2>
              {poke.name}{" "}
              <span className="muted">#{poke.id}</span>
            </h2>
            <p>
              <strong>Tipos</strong>{" "}
              {poke.types.map((t) => (
                <span key={t.slot} className="type-pill">
                  {t.type.name}
                </span>
              ))}
            </p>
            <p>
              <strong>Altura</strong> {poke.height / 10} m ·{" "}
              <strong>Peso</strong> {poke.weight / 10} kg
            </p>
            <p>
              <strong>Habilidades</strong>{" "}
              {poke.abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
