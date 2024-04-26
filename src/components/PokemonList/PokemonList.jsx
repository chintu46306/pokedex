import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  // const [PokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  //   const [pokedexUrl, setPokedexUrl] = useState ("https://pokeapi.co/api/v2/pokemon");  // the url of the api

  //   const [nextUrl, setNextUrl] = useState();  // the url of the next page
  //   const [prevUrl, setPrevUrl] = useState();  // the url of the previous page

  // this is the state of the pokemon list
  const [pokemonListState, setPokemonListState] = useState({
    PokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // setIsLoading(true);  // set loading to true (to show loading...
    setPokemonListState((state) => ({ ...state, isLoading: true })); // set loading to true (to show loading...
    const response = await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemons

    const pokemonResults = response.data.results; // we get array of pokemons from results

    console.log("response ise", response.data, response.data.next); // log the data to the console
    console.log(pokemonListState);

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    })); // set the next url and previous url

    // iterating over the array of pokemon, and using their url, to create an array of promises
    // that will download those 20 pokemons
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
      PokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  useEffect(() => {
    console.log("222pokemonListState", pokemonListState);
  }, [pokemonListState]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.PokemonList.map((p) => {
              console.log(
                "pokemonListState.PokemonList",
                pokemonListState.PokemonList
              );
              return (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              );
            })}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
