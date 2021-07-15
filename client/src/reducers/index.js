const initialState = {
    pokemons: [], //busqueda de pokemon
    allpokemons: [], //busqueda de pokemon
    pokemonsbyId: [], //busqueda de pokemon
    type:[], // 

  }
  
  function rootReducer(state = initialState, action) {
      if (action.type === "GET_POKEMONS") {
          return {
            ...state,
            pokemons: action.payload
          };
      }
      if (action.type === "GET_ALL_POKEMONS") {
        return {
          ...state,
          allpokemons: action.payload
        };
      }
      if (action.type === "GET_BY_ID") {
        return {
          ...state,
          pokemonsbyId: action.payload
        };
      }
  
      return state;
  }
    
  export default rootReducer;