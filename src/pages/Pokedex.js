import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchPokemon } from "../api";

const Pokedex = () => {
  const [pokedexInfo, setPokedexInfo] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    searchPokemon(id).then(setPokedexInfo);
  }, [id]);
  console.log(pokedexInfo)

  return (
    <div>
      <h1>Pokedex</h1>
      {pokedexInfo && (
        <div>
          <ul>
              <div>
              <img src={pokedexInfo.sprites.front_default} alt={200}/>

              </div>
            <li>
              <b>Name: </b>
              {pokedexInfo.name}
            </li>
            <li>
              <b>Number: </b>
              {pokedexInfo.id}
            </li>
          </ul>
          <div>
              <button onClick={() => {navigate("/pokegrid")}}>Pokedex</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;