
/*

const showMessage = () => {
    setTimeout(
        () => {
            console.log("Hello World!");
        },
        2000
    );
}



// Funcion asincrona
async function tarea() {
    return "asynchronous task";
}

// async / await
async function ejecutaTarea() {
    const resultado = await tarea();
    console.log(resultado);
}
ejecutaTarea();

const promesa = new Promise(
    (resolve, reject) => {
        const todobien = true;
        setTimeout(() => {
            if (todobien) {
                resolve("Todo bien");
            } else {
                reject("Todo mal");
            }
        }, 5000)
    }
);
todobien = true;
promesa.then((respuesta) => {
    console.log(respuesta);
}).catch((error) => {
    console.log(error);
});




const promesaUno = new Promise(
    (resolve, reject) => {
        resolve("Promesa uno resuelta");
    }
);

const promesaDos = new Promise(
    (resolve, reject) => {
        resolve("Promesa dos resuelta");
    }
);

const promesaTres = new Promise(
    (resolve, reject) => {
        resolve("Promesa tres fallida");
    }
);


promesaUno.then(res => {
    console.log(res);
    return promesaDos;
}).then(res => {
    console.log(res);
    return promesaTres;
}).catch(err => {
    console.log(err);
});


*/




const contenedor = document.getElementById("pokemonContainer");

async function fetchPokemon() {
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const datos = await respuesta.json();
        datos.results.forEach(
            pokemon => { fetchDetalles(pokemon.url) }
        );

    } catch (error) {
        console.log("Error para obtener los pokemones");
    }
}

async function fetchDetalles(url) {
    try {
        const detalles = await fetch(url);
        const pokemon = await detalles.json();
        createCard(pokemon);
    } catch (error) {
        console.log("No se pudo obtener la info del pokemon");
    }
}


function createCard(pokemon) {
    //Hacer la tarjeta
    const col = document.createElement("div");
    col.className = "col-md-4 col-lg-3";
    col.innerHTML = `
    <div class="card h-100 shadow-lg bg-secondary text-white">
        <img src="${pokemon.sprites.other['official-artwork'].front_default}"
        class="card-img-top p-3"
        alt ="${pokemon.name}">
        <div class="card-body text-center">
            <h5 class="card-title text-capitalize">${pokemon.name}</h5>
            <p class="card-text">
                Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}
            </p>
        </div>
    </div>
    `;
    contenedor.appendChild(col);
}

fetchPokemon();
