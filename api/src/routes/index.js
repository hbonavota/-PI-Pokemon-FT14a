const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Tipos} = require("../db.js");
const {Op} = require("sequelize");
const router = Router();
const { v4: uuidv4 } = require('uuid');

const dataApi = async ()=>{
    const arr = await  axios.get('https://pokeapi.co/api/v2/pokemon');
    console.log("arr.data.next: ",arr.data.next)
    return arr.data.results;
    
}
const dataApiNext = async ()=>{
  try {
    const arr = await  axios.get('https://pokeapi.co/api/v2/pokemon');
    const arrNext = await axios.get(arr.data.next)
  return arrnext;
  } catch (error) {
    console.log(error)
  }
  
}

const moreDataApi = async ()=>{
  try {
    const resultsDataApi = await dataApi();
    let results =[];
    for (let i = 0; i < 12; i++) {
      let newResults = await axios.get(resultsDataApi[i].url);
      let res = newResults.data
      let oneByOnePoke = {}
      res.types.length === 1 ? (oneByOnePoke = {
        id: res.id,
        name: res.name,
        img: res.sprites.front_default,
        speed: res.stats[5].base_stat,
        height: res.height,
        weight: res.weight,
        defense: res.stats[2].base_stat,
        attack: res.stats[1].base_stat,
        hp: res.stats[0].base_stat,
        types: res.types[0].type.name
      }) :
        (oneByOnePoke = {
            id: res.id,
            name: res.name,
            img: res.sprites.front_default,
            speed: res.stats[5].base_stat,
            height: res.height,
            weight: res.weight,
            defense: res.stats[2].base_stat,
            attack: res.stats[1].base_stat,
            hp: res.stats[0].base_stat,
            types: res.types[0].type.name + ", " + res.types[1].type.name
        })

      results.push(oneByOnePoke)
    }
    return results;
  } catch (error) {
    console.log(error)
  }
  
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
      id: uuidv4(),
    })
    console.log("the id from newPoke created is :", newPoke.id)
    res.status(200).json(newPoke)
    
  } catch (error) {
    console.log(error)
    res.status(404).send("Los parametros no son correctos o no es una ruta no valida");
  }
});

router.get('/pokemons', async (req,res)=>{
  let name = req.query.name;
  const resultsApi =  await dataApi();
  const moreInfo = await moreDataApi()


  if(name){
    try {
      let byname = await Pokemon.findAll({
        where:{
          name: name
        }
      });
      if(!byname.length) {
        res.status(404).json({error: "the name isn't exists"});
      }
      return res.json(byname)
    } catch (error) {
      
      console.log(error)
    }
  }
  try {
    let containsDBase = await Pokemon.findAll();
    if(!containsDBase.length || containsDBase.length < 12 ) await Pokemon.bulkCreate(moreInfo)
    res.json(moreInfo)
  } catch (error) {
    console.log(error)
  }

})

router.get('/pokemons/:id', async (req, res,next)=> {
  if(req.params.id.includes("-")){
    const byidd = await Pokemon.findOne({
      where: {
        id: req.params.id
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
    let containsTypes = await Tipos.findAll();
    if(!containsTypes.length || containsTypes.length < 12) {
      await Tipos.bulkCreate(resultsApiTypes)
      let containsTypes = await Tipos.findAll();
      res.status(200).json(containsTypes)
    }
    res.status(200).json(containsTypes)
  } catch (error) {
    console.log(error)
  }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
