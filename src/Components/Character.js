import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams, useNavigate , NavLink} from 'react-router-dom';
import Loading from './Loading';

export default function Character() {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [character, setCharacter] = useState([]);
    const apikey = process.env.REACT_APP_APIKEY;
    const hash = process.env.REACT_APP_HASH;

    const getCharacterData = async () => {
        try {
            const {id} = params;
            const getData = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=${apikey}&hash=${hash}`);
            setCharacter(getData); 
            setError(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        //navigate('/');
        if(params.id){
            getCharacterData();
        }
    }, [params.id])
    
    if(error) return <h1 className='margin-auto text-center text-5xl p-10 text-white'>Could'nt find the character.</h1>

  return (
    <div>
        {loading ? <Loading /> :  (
            <div className='flex justify-around mt-10'> 
                <div className="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img className="rounded-t-lg" src={`${character.data.data.results[0].thumbnail.path}.${character.data.data.results[0].thumbnail.extension}`} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{character.data.data.results[0].name}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{character.data.data.results[0].modified}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{character.data.data.results[0].description}</p>
                        <NavLink to='/' className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Return
                        </NavLink>
                    </div>
                </div>
            </div>
        )}    
    </div>
  )
}
