import axios from "axios";
import { useState, useEffect } from "react";


function usePokemonList(type){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon', 
        nextUrl: "",
        prevUrl: ""
      });

      async function downloadPokemons() {
        // setIsLoading(true);  // set loading to true (to show loading...
        
    
        // iterating over the array of pokemon, and using their url, to create an array of promises
        // that will download those 20 pokemons
        
        
            setPokemonListState((state) => ({ ...state, isLoading: true })); // set loading to true (to show loading...
        const response = await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemons
    
        const pokemonResults = response.data.results; // we get array of pokemons from results
    
        console.log("response ise", response.data.pokemon); // log the data to the console
        console.log(pokemonListState);
    
        setPokemonListState((state) => ({
          ...state,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        })); // set the next url and previous url

        const pokemonResultPromise = pokemonResults.map((pokemon) =>
          axios.get(pokemon.url)
        ); // map through the results and get the url of each pokemon
    
        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon details data
        // console.log(pokemonData);
    
        // now iterate on the data of each pokemon, and extract id, name, image, types
        const pokeListResult = pokemonData.map((pokeData) => {
          // map through the data and get the id, name, image and type of each pokemon
          const pokemon = pokeData.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.front_shiny,
            type: pokemon.types,
          };
        });
    
        setPokemonListState((state) => ({
          ...state,
          pokemonList: pokeListResult,
          isLoading: false,
        }));
    }

      useEffect(() => {
        downloadPokemons();
      }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState]
}

export default usePokemonList;