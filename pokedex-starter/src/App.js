import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

function capitalize(word) {
  if (typeof (word) === 'string') {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

function convertNumber(number) {
  if (typeof (number) === 'number') {
    return number / 10;
  }
}

function App() {
  const [pokemon, setPokemon] = useState({});
  const [newSearch, setNewSearch] = useState();

  useEffect(() => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${newSearch}`;
    const makeApiCall = async () => {
      const res = await axios.get(pokemonUrl);
      setPokemon(res.data);
    }
    makeApiCall()
  }, [newSearch])

  return (
    <>
      <header className="bg-dark d-flex justify-content-between px-5">
        <nav className="navbar navbar-dark">
          <div className="nav">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img
                src="https://www.freeiconspng.com/uploads/pokeball-transparent-png-2.png"
                width="55"
                height="55"
                className="d-inline-block align-top m-2 d-inline"
                alt="Pokéball"
              />
              <span className="navbar-text text-white font-weight-bold">
                Pokédex
              </span>
            </a>
            <form onSubmit={(e) => {
              e.preventDefault();
              setNewSearch(pokemon);
              setPokemon("");
            }}>
              <label htmlFor="pokemon"></label>
              <input name="pokemon" type="search" placeholder="search for a Pokemon" onChange={(e) => {
                setPokemon(e.target.value.toLowerCase())
              }} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </nav>
      </header>
      <main className="d-flex justify-content-center align-items-center">
        <section
          id="results"
          className="d-flex justify-content-center flex-wrap col-10"
        ></section>
        <div id="resultChart">
          <h3>Name: {capitalize(pokemon.name)}</h3>
          <h4>#{pokemon.id}</h4>
          <h4>Height: {convertNumber(pokemon.height)} m</h4>
          <h4>Weight: {convertNumber(pokemon.weight)} kg</h4>
        </div>
      </main>
    </>
  );
}

export default App;