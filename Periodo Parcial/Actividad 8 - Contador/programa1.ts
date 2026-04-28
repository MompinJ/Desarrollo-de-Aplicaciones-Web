let c: number = 0;  // Fuerza a que sea de tipo number
let ci: number = 0;
let cd: number = 0;

const count = document.getElementById("count") as HTMLElement;           // Busca en el documento HTML el elemento que tiene el id y lo guarda en la constante
const incCount = document.getElementById("incCount") as HTMLElement;
const decCount = document.getElementById("decCount") as HTMLElement;

function inc(): void {   // funcion void (vacia) que no devuelve nada
    c = (c >= 10) ? 0 : c + 1;   // operador ternario
    ci = (ci >= 10) ? 0 : ci + 1;
    update(); // llamada a funcion
}

function dec(): void {  // funcion de decremento
    c = c > 0 ? c - 1 : 0;
    cd = (cd >= 10) ? 0 : cd + 1;
    update();
}

function update(): void {
    incCount.textContent = ci.toString(); // Toma el valor numérico de ci, lo convierte a texto usando .toString(), y lo inyecta en el HTML.
    decCount.textContent = cd.toString();
    count.textContent = c.toString();
}

export { };
