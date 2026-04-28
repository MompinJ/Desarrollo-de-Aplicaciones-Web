var c = 0; // Fuerza a que sea de tipo number
var ci = 0;
var cd = 0;
var count = document.getElementById("count"); // Busca en el documento HTML el elemento que tiene el id y lo guarda en la constante
var incCount = document.getElementById("incCount");
var decCount = document.getElementById("decCount");
function inc() {
    c = (c >= 10) ? 0 : c + 1; // operador ternario
    ci = (ci >= 10) ? 0 : ci + 1;
    update(); // llamada a funcion
}
function dec() {
    c = c > 0 ? c - 1 : 0;
    cd = (cd >= 10) ? 0 : cd + 1;
    update();
}
function update() {
    incCount.textContent = ci.toString(); // Toma el valor numérico de ci, lo convierte a texto usando .toString(), y lo inyecta en el HTML.
    decCount.textContent = cd.toString();
    count.textContent = c.toString();
}
