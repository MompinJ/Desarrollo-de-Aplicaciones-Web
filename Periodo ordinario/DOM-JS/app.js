// Demostracion practica del DOM:
// agregar, marcar y eliminar elementos de una lista.

const lista = document.querySelector("ul");
const titulo = document.querySelector("#titulo");
const enlace = document.querySelector("a");

function agregarElemento(texto) {
  const item = document.createElement("li");
  item.textContent = texto;
  item.classList.add("items-color1");
  item.addEventListener("click", () => item.classList.toggle("items-tachado"));
  lista.appendChild(item);
  return item;
}

function actualizarTitulo(nuevo) {
  titulo.textContent = nuevo;
  titulo.style.color = "#2d6cdf";
}

function cambiarEnlace(href, etiqueta) {
  enlace.setAttribute("href", href);
  enlace.textContent = etiqueta;
}

const recienAgregado = agregarElemento("Elemento 5 (dinamico)");
actualizarTitulo("Lista de Elementos (DOM en accion)");
cambiarEnlace("https://github.com", "Ir a GitHub");

setTimeout(() => recienAgregado.remove(), 4000);
