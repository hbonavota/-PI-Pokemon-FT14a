import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import {getAllPokemon} from "../../actions/index.js"
import { connect } from "react-redux";
import './Home.css';


export class Home extends Component {
    componentDidMount(){
        
        this.props.getAllPokemon();
    }    
      render() {
        return (
            <div className="CtnMayor">
                <h2 className="title">POKEMONS</h2>
                <div className="CtnMayor">
                      <button>Anterior</button>
                      <button>Siguiente</button>
                    <div className="ctn">
                            {this.props.allpokemons && this.props.allpokemons.map(elem =>(
                            <div  className="Ctn" Key={elem.id}>
                                
                                <NavLink to={`/pokemons/${elem.id}`}>{elem.name}</NavLink>
                                <div className="containsPrev">
                                    <img className="img" src={elem.img} alt="No hay imagen :/"></img>
                                </div>
                                <div>
                                    <h3>Types : {elem.types}</h3>
                                    <h3>Speed : {elem.speed}</h3>
                                    <h3>Height : {elem.height}</h3>
                                    <h3>Weight : {elem.weight}</h3>
                                    <h3>Attack : {elem.attack}</h3>
                                    <h3>Defense : {elem.defense}</h3>
                                    <h3>HP : {elem.hp}</h3>
                                </div>
                            </div>
                            ))
                            }
                    </div>
                        
                </div>
          </div>
        );
      }
    }

    function mapStateToProps(state) {
        return {
            allpokemons: state.allpokemons
        };
      }
      
      function mapDispatchToProps(dispatch) {
        return {
            getAllPokemon: name => dispatch(getAllPokemon(name))
        };
      }
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Home);