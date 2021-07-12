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
    return arr.data.results;
}
const typesDataApi = async ()=>{
  const typesArr = await  axios.get('https://pokeapi.co/api/v2/type');
  return typesArr.data.results;
}
  
router.post('/pokemons',async (req,res)=>{
  try {
    const  dataNewPokemon = req.body;
    const newPoke = await Pokemon.create({
      ...dataNewPokemon,
      idd: uuidv4()
    })
    console.log("the id from newPoke created is :", newPoke.idd)
    res.status(200).send("poke agregado con exito")
    
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
    let containsDBase = await Pokemon.findAll();
    if(!containsDBase.length) await Pokemon.bulkCreate(resultsApi)
    res.json(resultsApi)
  } catch (error) {
    console.log(error)
  }

})

router.get('/pokemons/:id', async (req, res,next)=> {
  if(req.params.id.includes("-")){
    const byidd = await Pokemon.findOne({
      where: {
        idd: req.params.id
      }
    });
    res.json(byidd)

  }else{
    Pokemon.findByPk(req.params.id)
      .then(byID =>
        byID ? res.json(byID) : res.sendStatus(404)
      )
      .catch(error => next(error))
  }
});

router.get('/types',async(req,res)=>{
  const resultsApiTypes = await typesDataApi();
  try {
    let containsTypes = await Type.findAll();
    if(!containsTypes.length) {
      await Type.bulkCreate(resultsApiTypes)
      let containsTypes = await Type.findAll();
      res.status(200).json(containsTypes)
    }
  } catch (error) {
    console.log(error)
  }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
