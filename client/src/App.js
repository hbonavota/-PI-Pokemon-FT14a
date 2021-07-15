import React from "react";
import './App.css';
import Search from "./components/Search/Search.js"
import Home from "./components/Home/Home.js"
import NavBar from "./components/NavBar/NavBar.js"
import PokemonDetail from "./components/PokemonDetail/PokemonDetail.js"
import AddPokemon from "./components/AddPokemon/AddPokemon.js"
import { Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/AddPokemon" component={AddPokemon} />
      <Route path="/pokemons/:id" component={PokemonDetail} />
        <div className="App">
        </div>
    </React.Fragment>
  );
}


export default App;
