/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon,Type, conn } = require('../../src/db.js');
const axios = require('axios');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  describe('post /pokemons', () => {
    it('should get 404 if not contains arguments ', () =>
      agent.post('/pokemons').send({}).expect(404)
    );
    it('should get 200 if newpokemon is created ', () =>
    agent.post("/pokemons").send(pokemon).expect(200)
    );
    it('should return the mesagge when the newpokemon is created ', () =>
    agent.post("/pokemons").send(pokemon).expect("poke agregado con exito")
    );
    
  });
});
describe('GET /types', async() => {
  it('should get 200', () =>
    agent.get('/types').expect(200)
  );
});
describe('GET By ID /pokemons', async() => {
  it('should get 200', () =>
    agent.get('/pokemons/1').expect(200)
  );
  it('should return the first pokemon where her name is bulbasaur', () =>{
    agent.get('/pokemons/1')
    .then((res)=>{
      res.expect(res.body.name).to.be.equal("bulbasaur")
    })
  });
  it('should return the second pokemon where her name is ivysaur', () =>{
    agent.get('/pokemons/2')
    .then((res)=>{
      res.expect(res.body.name).to.be.equal("ivysaur")
    })
  });
  
});


