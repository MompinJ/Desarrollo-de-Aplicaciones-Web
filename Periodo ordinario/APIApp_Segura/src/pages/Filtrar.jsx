import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTypeByName, fetchTypes } from "../api/pokeApi.js";
import Layout from "../components/Layout.jsx";

function idFromSpeciesUrl(url) {
  const m = /\/(\d+)\/?$/.exec(url);
  return m ? m[1] : null;
}

export default function Filtrar() {
  const [typeList, setTypeList] = useState([]);
  const [selected, setSelected] = useState("fire");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await fetchTypes();
        if (!cancelled) {
          const names = json.results.map((r) => r.name).sort();
          setTypeList(names);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    (async () => {
      try {
        const json = await fetchTypeByName(selected);
        if (cancelled) return;
        const entries = json.pokemon || [];
        setPokemon(
          entries.map((entry) => ({
            name: entry.pokemon.name,
            url: entry.pokemon.url,
          }))
        );
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selected]);

  return (
    <Layout title="Filtrar por tipo">
      <p className="app-lead">
        Elige un tipo y explora la lista.
      </p>
      <div className="glass-card filter-toolbar">
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          className="app-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {typeList.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {error ? <p className="error">{error}</p> : null}
      {loading ? <div className="loading">Cargando…</div> : null}
      {!loading && pokemon.length > 0 ? (
        <div className="glass-card">
          <ul className="filter-list">
            {pokemon.map((p) => {
              const pid = idFromSpeciesUrl(p.url);
              return (
                <li key={p.name} className="filter-row">
                  <span>{p.name}</span>
                  {pid ? (
                    <Link to={`/detalles/${pid}`}>Ver detalle</Link>
                  ) : (
                    <span className="dash-muted">—</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </Layout>
  );
}
