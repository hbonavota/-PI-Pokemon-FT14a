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

/* export async function addPokemon(obj) {
  return function(dispatch) {
    return fetch("http://localhost:3001/pokemons)
      .then(response => response.json())
      .then(json => {
        dispatch({ 
          type: "ADD_POKEMON", 
          payload: json
         });
      });
  };


} */


/* let response = await fetch('http://localhost:3001/pokemons', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(obj)
});

let result = await response.json();
alert(result.message); */