import React, { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  // Estado para guardar nuestro arreglo de 6 IDs
  const [teamIds, setTeamIds] = useState([]);

  // Funcion para generar 6 numeros aleatorios
  const generateTeam = () => {
    // Crea un arreglo de 6 espacios y lo llena con numeros aleatorios
    const newTeam = Array.from({ length: 20  }, () => Math.floor(Math.random() * 1025) + 1);
    setTeamIds(newTeam);
  };

  // Se ejecuta una vez al iniciar la app para tener un equipo listo
  useEffect(() => {
    generateTeam();
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Mi Equipo Pokemon TCG</h1>
      
      <button className="generate-btn" onClick={generateTeam}>
        Generar Nuevo Equipo
      </button>

      <div className="team-grid">
        {/* Recorremos el arreglo de IDs y renderizamos una carta por cada uno */}
        {teamIds.map((pokemonId, index) => (
          <PokemonCard key={index} id={pokemonId} />
        ))}
      </div>
    </div>
  );
}

export default App;
