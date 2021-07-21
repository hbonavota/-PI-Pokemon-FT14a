import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import {getAllPokemon} from "../../actions/index.js"
import { connect } from "react-redux";
import './Home.css';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'All'};

    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount(){
    console.log("this.state",this.state);
      this.props.getAllPokemon();
  }    

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  pokeFilter(e) {
    console.log(e.target.id);
    // somehow filter the react table
  }
  
    render() {
      return (
        <div className="CtnMayor">
            <h2 className="title">POKEMONS</h2>
            <div className="CtnMayor">
                  <button>Anterior</button>
                  <button>Siguiente</button>
                  <div>
                    <button onClick={this.pokeFilter} >A</button>
                    <button onClick={this.pokeFilter} >B</button>
                    <button onClick={this.pokeFilter} >C</button>
                  </div>
                  <div>
                  <label>
                      Order by:
                      <select value={this.state.value} onChange={this.handleChange}>
                        <option selected value='All'>All</option>
                        <option value='A-Z'>A-Z</option>
                        <option value='Z-A'>Z-A</option>
                        <option value='Attack Des'>Less Attack</option>
                        <option value='Attack Asc'>More Attack</option>
                      </select>
                    </label>
                  </div>
                  
                <div className="ctn">
                        {this.props.allpokemons && this.props.allpokemons.map(elem =>(
                        <div  className="Ctn" Key={elem.id}>
                            
                            <NavLink to={`/pokemons/${elem.id}`}>{elem.name}</NavLink>
                            <div className="containsPrev">
                                <img className="img" src={elem.img} alt="No hay imagen :/"></img>
                            </div>
                            <div >
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