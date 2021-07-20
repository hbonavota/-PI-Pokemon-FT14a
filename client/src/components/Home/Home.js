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
                    <div className="ctn">
                        
                            {this.props.allpokemons && this.props.allpokemons.map(elem =>(
                            <div  className="Ctn" Key={elem.id}>
                                
                                <NavLink to={`/pokemons/${elem.id}`}>{elem.name}</NavLink>
                                <div className="containsPrev">
                                    <img className="img" src={elem.img} alt="No hay imagen :/"></img>
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