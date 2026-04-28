import React, { useState, useEffect } from 'react';
import './PokemonCard.css';
import Tilt from 'react-parallax-tilt';

// ... (Manten las interfaces PokemonType y PokemonData igual que antes)
interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: {
    base_stat: number;
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
}

// Nueva interfaz para recibir el ID desde afuera
interface PokemonCardProps {
  id: number;
}

// Recibimos el id como parametro
const PokemonCard: React.FC<PokemonCardProps> = ({ id }) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        // Usamos el ID que viene de las props
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setPokemon(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]); // El useEffect se volvera a ejecutar si el ID cambia

  if (loading) return <div className="loading">Buscando...</div>;
  if (error || !pokemon) return <div className="error">Error: {error}</div>;


// ... todo el codigo anterior del componente (useEffect, if loading, etc.) se mantiene igual

  if (loading) return <div className="loading">Buscando...</div>;
  if (error || !pokemon) return <div className="error">Error: {error}</div>;

  return (
    <Tilt 
      glareEnable={true} 
      glareMaxOpacity={0.4} 
      scale={1.05}
      transitionSpeed={2500}
    >
      <div className={`pokemon-card-container ${pokemon.types[0].type.name}`}>
        
        <div className="card-header">
          <span className="name">{pokemon.name}</span>
          <span className="hp-container">
            <small>HP</small> {pokemon.stats[0]?.base_stat || 50}
          </span>
        </div>

        <div className="image-frame">
          <img
            className="pokemon-image"
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>

        <div className="stats-bar">
          <span>Pokemon {pokemon.types[0].type.name}. Altura: {pokemon.height / 10}m, Peso: {pokemon.weight / 10}kg.</span>
        </div>

        <div className="abilities-section">
          {pokemon.moves.slice(0, 2).map((move, index) => (
            <div key={index} className="ability">
              <span className="ability-name">{move.move.name.replace('-', ' ')}</span>
              <span className="damage">20+</span>
            </div>
          ))}
        </div>

      </div>
    </Tilt>
  ); // <-- Aqui esta el parentesis y punto y coma que faltaban
};

export default PokemonCard;

