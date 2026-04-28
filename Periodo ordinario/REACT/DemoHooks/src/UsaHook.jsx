import { useState } from "react";

function UsaHook(){
    /*var nombre="Juan";
    const [nombre, setNombre]= useState("Juan");
    const [flag, setFlag]=useState(false);
    const [fragmento, setFragmento]=useState(false);

    return fragmento ?
    <>
        <div>
            <h1>{nombre}</h1>
            <button onClick={()=>{setNombre("Pedro");
                console.log(nombre)
            }}>
                Click me
            </button>
            <p>{flag?"Afirmativo":"Negativo"}</p> 
        </div>
    </>
    :
    <>
        <h1>Nada que mostrar</h1>
    </>
    */

    const [contador, setContador]= useState(0);

    return (
        <div>
            <h1>{contador}</h1>
            <button onClick={()=>setContador(contador+1)}>Incrementar</button>
            <button onClick={()=>setContador(contador-1)}>Decrementar</button>
        </div>
    );
}

export default UsaHook;