export function getPokemon(name) {
  return function(dispatch) {
    return fetch("http://localhost:3001/pokemons?name=" + name)
      .then(response => response.json())
      .then(json => {
        dispatch({ 
          type: "GET_POKEMONS", 
          payload: json
         });
      });
  };
}
export function getById(id) {
  return function(dispatch) {
    return fetch("http://localhost:3001/pokemons/" + id)
      .then(response => response.json())
      .then(json => {
        dispatch({ 
          type: "GET_BY_ID", 
          payload: json
         });
      });
  };
}

export function getAllPokemon() {
  return function(dispatch) {
    return fetch("http://localhost:3001/pokemons")
      .then(response => response.json())
      .then(json => {
        dispatch({ 
          type: "GET_ALL_POKEMONS", 
          payload: json
         });
      });
  };
}
