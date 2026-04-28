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
