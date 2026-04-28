import { useEffect, useState } from "react"
import { CSpinner } from '@coreui/react'

export function MuestraPokemon(){
    const [pokemon, setPokemon] = useState(null);

    useEffect(
        ()=>{
            fetch("https://pokeapi.co/api/v2/pokemon/pikach")
            .then(res => res.json())
            .then(data => setPokemon(data));
            },[]
    );

    return pokemon ? <h1>{pokemon.name}</h1>:<><CSpinner color="primary" /></>
}