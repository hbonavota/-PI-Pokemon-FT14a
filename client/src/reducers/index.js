const initialState = {
    pokemons: [], //busqueda de pokemon
    type:[], // listado de peliculas buscadas

  }
  
  function rootReducer(state = initialState, action) {
      if (action.type === "GET_POKEMONS") {
          return {
            ...state,
            pokemons: action.payload
          };
      }
  
      return state;
  }
    
  export default rootReducer;