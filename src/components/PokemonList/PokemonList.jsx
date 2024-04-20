import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css"

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);  

  async function downloadPokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    console.log(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (  
    <div className="pokemon-list-wrapper">
       <div>Pokemon List</div> 
        {(isLoading) ? 'Loading...' : 'Data downloaded'}  
    </div>
    )
}

export default PokemonList;
