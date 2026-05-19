const LIMITE = 10;

const refValor = document.getElementById("count");
const refIncs = document.getElementById("incCount");
const refDecs = document.getElementById("decCount");

let valor = 0;
let totalIncs = 0;
let totalDecs = 0;

function pintar() {
  refValor.textContent = valor;
  refIncs.textContent = totalIncs;
  refDecs.textContent = totalDecs;
}

function incrementar() {
  valor = valor >= LIMITE ? 0 : valor + 1;
  totalIncs = totalIncs >= LIMITE ? 0 : totalIncs + 1;
  pintar();
}

function decrementar() {
  valor = valor > 0 ? valor - 1 : 0;
  totalDecs = totalDecs >= LIMITE ? 0 : totalDecs + 1;
  pintar();
}

document.getElementById("btnInc").addEventListener("click", incrementar);
document.getElementById("btnDec").addEventListener("click", decrementar);

pintar();
