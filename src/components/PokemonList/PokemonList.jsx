import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);  

    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";  // the url of the api

  async function downloadPokemon() {
    const response = await axios.get(POKEDEX_URL);  // this downloads list of 20 pokemons
    const pokemonResults = response.data.results;  // we get array of pokemons from results
    console.log(response.data);   // log the data to the console

    // iterating over the array of pokemon, and using their url, to create an array of promises
    // that will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));  // map through the results and get the url of each pokemon

    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise);  // array of 20 pokemon details data
    console.log(pokemonData);
    
    
    // now iterate on the data of each pokemon, and extract id, name, image, types
    const res = pokemonData.map((pokeData)=> {    // map through the data and get the id, name, image and type of each pokemon
        const pokemon = pokeData.data;
        return {
            id: pokemon.id,
            name : pokemon.name, 
            image: (pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
            type: pokemon.types
        }
    });
    console.log(res);
    setPokemonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (  
    <div className="pokemon-list-wrapper">
       <div className="pokemon-wrapper">
            {(isLoading) ? 'Loading...' :  
             PokemonList.map((p)=> <Pokemon name= {p.name} image={p.image} key={p.id}/>)
            } 
       </div>
            <div className="controls">
                <button>Prev</button>
                <button>Next</button>
            </div>
    </div>
    )
}

export default PokemonList;
