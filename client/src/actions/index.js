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
