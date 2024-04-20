import Search from "../Search/Search";

// css import
import "./Pokedex.css";

function Pokedex(){
    return (
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading">Pokedex</h1>
            <Search />
        </div>
    )
}

export default Pokedex;