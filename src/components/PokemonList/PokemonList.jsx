import { useEffect } from "react";
import axios from "axios";
import './PokemonList.css';


function PokemonList (){

   async function downloadPokemon(){
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    console.log(response.data);   
   } 

useEffect(() => {
    downloadPokemon();
}, []);

    

    return (
        <div className="pokemon-list-wrapper">
            Pokemon List
        </div>
    )
}

export default PokemonList;