const API_BASE = "https://pokeapi.co/api/v2/pokemon";
const LIMITE = 20;

const contenedor = document.getElementById("pokemonContainer");

async function obtenerListado(limite) {
  const respuesta = await fetch(`${API_BASE}?limit=${limite}`);
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
  const datos = await respuesta.json();
  return datos.results;
}

async function obtenerDetalle(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
  return respuesta.json();
}

function construirCarta(pokemon) {
  const imagen = pokemon.sprites.other["official-artwork"].front_default;
  const tipos = pokemon.types.map((t) => t.type.name).join(", ");

  const col = document.createElement("div");
  col.className = "col-md-4 col-lg-3";
  col.innerHTML = `
    <div class="card h-100 shadow-lg bg-dark text-white border-0">
      <img src="${imagen}" class="card-img-top p-3" alt="${pokemon.name}" />
      <div class="card-body text-center">
        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
        <p class="card-text"><strong>Tipo:</strong> ${tipos}</p>
        <p class="card-text"><small>ID #${pokemon.id}</small></p>
      </div>
    </div>
  `;
  contenedor.appendChild(col);
}

async function cargar() {
  try {
    const lista = await obtenerListado(LIMITE);
    const detalles = await Promise.all(lista.map((p) => obtenerDetalle(p.url)));
    detalles.forEach(construirCarta);
  } catch (err) {
    contenedor.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
  }
}

cargar();
