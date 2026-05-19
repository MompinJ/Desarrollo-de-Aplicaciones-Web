import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonList } from "../api/pokeApi.js";
import Layout from "../components/Layout.jsx";

function idFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await fetchPokemonList(24);
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Layout title="Inicio">
      <p className="app-lead">
        Datos en vivo desde{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          PokeAPI
        </a>
        .
      </p>
      {error ? <p className="error">{error}</p> : null}
      {!data && !error ? (
        <div className="loading">Cargando Pokémon…</div>
      ) : null}
      {data ? (
        <div className="grid">
          {data.results.map((p) => {
            const id = idFromUrl(p.url);
            return (
              <Link
                key={p.name}
                to={`/detalles/${id}`}
                className="glass-card poke-card"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                  }}
                />
                <div className="poke-name">{p.name}</div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </Layout>
  );
}
