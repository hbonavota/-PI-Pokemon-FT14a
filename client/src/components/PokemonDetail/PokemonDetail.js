import React, { Component } from "react";
import { connect } from 'react-redux';
import {getById} from "../../actions/index.js"
import { NavLink } from 'react-router-dom';

import './PokemonDetail.css';

export class PokemonDetail extends Component {

  componentDidMount(){
    let pokeId = parseInt(this.props.match.params.id);
    this.props.getById(pokeId +1);
  }
  handleChange() {
    this.props.getById(parseInt(this.props.match.params.id) + 1);
  }


    render() {
        return (
          <div className="container">
            {/* <button onClick = {()=> window.history.back()} >Volver Atrás</button> */}
            <NavLink onClick = {()=> this.handleChange()} to={`/pokemons/${parseInt(this.props.match.params.id) -1}`}>Anterior</NavLink>
            <div className="card">      
                <div  className="Ctn" Key={this.props.pokemonsbyId.id}>
                    <h1>{this.props.pokemonsbyId.name}</h1>
                    <div className="containsPrev">
                        <img className="img" src={this.props.pokemonsbyId.img} alt="No hay imagen :/"></img>
                    </div>
                    <h2>Types : {this.props.pokemonsbyId.types}</h2>
                </div>
                
            </div>
            <NavLink onClick = {()=> this.handleChange()} to={`/pokemons/${parseInt(this.props.match.params.id) + 1}`}>Siguiente</NavLink>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pokemonsbyId: state.pokemonsbyId
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getById: pokeId => dispatch(getById(pokeId))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PokemonDetail);