const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const data = async ()=>{
    const arr = await  axios.get('https://pokeapi.co/api/v2/pokemon');
    console.log("data",arr.results)
    return arr.results;
  }
router.use('/pokemons',data)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
