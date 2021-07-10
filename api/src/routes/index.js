const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Type} = require("../db.js");
const {Op} = require("sequelize");
const router = Router();
const { v4: uuidv4 } = require('uuid');

const dataApi = async ()=>{
    const arr = await  axios.get('https://pokeapi.co/api/v2/pokemon');
    //console.log("arr.result es :",arr.data.results);
    return arr.data.results;
}
  
router.post('/pokemons',async (req,res)=>{
  try {
    const  dataNewPokemon = req.body;
    const newPoke = await Pokemon.create({
      ...dataNewPokemon,
      idd: uuidv4()
    })
    console.log("the id from newPoke created is :", newPoke.idd)
    res.send("poke agregado con exito")
    
  } catch (error) {
    console.log(error)
    res.status(404).send("ruta no valida");
  }
});

router.get('/pokemons', async (req,res)=>{
  let name = req.query.name;
  const resultsApi = await dataApi();

  if(name){
    try {
      let byname = await Pokemon.findAll({
        where:{
          name: name
        }
      });
      if(!byname.length) {
        res.status(404).json({error: "the name it is not exists"});
      }
      return res.json(byname)
    } catch (error) {
      
      console.log(error)
    }
  }
  try {
    let containsBase = await Pokemon.findAll();
    if(!containsBase.length) await Pokemon.bulkCreate(resultsApi)
    res.json(resultsApi)
  } catch (error) {
    console.log(error)
  }


})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
