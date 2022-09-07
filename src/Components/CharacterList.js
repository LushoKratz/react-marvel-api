import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';

export default function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState();
    const [error, setError] = useState(false);
    const apikey = process.env.REACT_APP_APIKEY;
    const hash = process.env.REACT_APP_HASH;

    const getData = async () => {
      try {
        const getCharacters = 
            await axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apikey}&hash=${hash}&limit=50`);
        setCharacters(getCharacters);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        const searchCharacter = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?&nameStartsWith=${search}&limit=50&ts=1&apikey=${apikey}&hash=${hash}`)
        //console.log(searchCharacter.data.data.results);
        setCharacters(searchCharacter);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }
  
    useEffect(() => {
      getData();
    }, [])
    if(error) return <h1 className='m-auto font-bold text-white text-center mt-20 text-4xl'>Unexpected Error</h1>
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={e => setSearch(e.target.value)} value={search || ''} className="mt-10 center m-auto placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-1 pl-1 pr-1 shadow-sm w-5/6 h-11 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm focus:text-gray-800" placeholder="Search a character..." type="text" name="search"/>
      </form>
      {error && <h1>Error</h1>}
      <div className="grid grid-cols-4 gap-4 p-4 w-100 p-20"> 
                {loading ? <Loading /> : characters.data.data.results.map(character => (
              <div className='text-white font-bold m-5 bg-slate-900 p-4 rounded-xl' key={character.id}>
                  {character.name}
              <div className='badge mt-5'>
                  <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt='.jpg' className='self-center w-30 h-30 rounded-lg mx-1' />
              </div>
              <br />
              <NavLink to={`/character/${character.id}`} className='bg-rose-900 hover:bg-rose-800 rounded-md px-4 py-1 mt-4 w-100'>Ver mas...</NavLink>
          </div>
          ))}
      </div>
    </div>
  )
}
