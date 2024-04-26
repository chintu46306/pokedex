import { Link } from 'react-router-dom';
import './Pokemon.css';

function Pokemon({name, image, id}){
    return (
        <div className='pokemon'>
            <Link to={`/pokemon/${id}`}>   
                <div>
                    <img className='pokemon-image' src= {image} />
                </div>
            </Link>
        </div>
    )
}

export default Pokemon;