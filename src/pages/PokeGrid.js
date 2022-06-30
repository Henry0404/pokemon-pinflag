import { useEffect, useState } from 'react';
import { getPokemonData, getPokemons, searchPokemon } from '../api';
import '../css/Pokegrid.css';
import Navbar from '../components/Navbar';
import Pokedex from '../components/Pokedex';
import Searchbar from '../components/Searchbar';
import { FavoriteProvider } from '../contexs/favoritesContexs';

const localStorageKey = "favorite_pokemon";

function PokeGrid() {
  const [pokemons, setPokemons ] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false)
  const [searching, setSearching] = useState(false)

  const fetchPokemons = async() => {
try {
  setLoading(true)
  const data = await getPokemons(25, 25 * page)
  const promise = data.results.map(async(pokemon) => {
    return await getPokemonData(pokemon.url)
  })
  const results = await Promise.all(promise)
  setPokemons(results)
  setLoading(false)
  setTotal(Math.ceil(data.count / 25));
  setNotFound(false)
} catch (error) {
  
}
  }
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) ||[];
    setFavorites(pokemons);
  }
  useEffect(() => {
    loadFavoritePokemons()
  }, [])


  useEffect(() => {
    if(!searching) {
      fetchPokemons()
    }
  }, [page])

  const updateFavoritePokemons = (name) => {
    const update = [...favorites];
    const isFavorite = update.indexOf(name)
    if(isFavorite >= 0) {
      update.splice(isFavorite, 1)
    } else{
      update.push(name)
    }
    setFavorites(update)
    window.localStorage.getItem(localStorageKey, JSON.stringify(update))
  }

  const onSearch = async(pokemon) =>{
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true)
    setNotFound(false)
    setSearching(true)
    const result = await searchPokemon(pokemon)
    if(!result) {
      setNotFound(true)
      setLoading(false)
      return;
    } else {
      setPokemons([result])
      setPage(0)
      setTotal(1)
    }
    setLoading(false)
    setSearching(false)
  }
  return (
    <FavoriteProvider
    value={{
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemons
    }}>

    <div>
      <Navbar />
      <div className="PokeGrid">
        <Searchbar onSearch={onSearch}/>
        {notFound ? (
          <div className='not-found-text'>No se encontro el pokemon que buscabas</div>
        ): (
          <Pokedex 
          pokemons={pokemons} 
          page={page} 
          setPage={setPage}
          total={total}
          loading={loading}
          />
          )}
      </div>
    </div>
          </FavoriteProvider>
  );
}

export default PokeGrid;
