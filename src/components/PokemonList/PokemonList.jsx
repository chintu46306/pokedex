import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);  

  async function downloadPokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");  // get the data from the api
    const pokemonResults = response.data.results;  // get the results from the response
    const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));  // map through the results and get the url of each pokemon

    const pokemonData = await axios.all(pokemonResultPromise);  // get the data of each pokemon
    console.log(pokemonData);
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
       <div>Pokemon List</div> 
        {(isLoading) ? 'Loading...' :  
         PokemonList.map((p)=> <Pokemon name= {p.name} image={p.image} key={p.id}/>)
        } 
    </div>
    )
}

export default PokemonList;
