import React, { Component } from "react";
//import { NavLink } from 'react-router-dom';
import {getPokemon} from "../../actions/index.js"
import { connect } from "react-redux";


export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: ""
        };
      }
      handleChange(event) {
        this.setState({ name: event.target.value });
      }
      handleSubmit(event) {
        event.preventDefault();
        this.props.getPokemon(this.state.name);
      }
    
      render() {
        const { name } = this.state;
        return (
          <div>
            <h2>Buscador</h2>
            <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
              <div>
                <label className="label" htmlFor="name">Pokemon: </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <button type="submit">BUSCAR</button>
            </form>
           {/*  <ul>
             {this.props.movies && this.props.movies.map(el =>(
              <div Key={el.imdbID}>
                
                <NavLink to={`/movie/${el.imdbID}`}>{el.name}</NavLink>

              </div>
             ))
             }
            </ul> */}
          </div>
        );
      }
    }

    function mapStateToProps(state) {
        return {
            pokemons: state.pokemons
        };
      }
      
      function mapDispatchToProps(dispatch) {
        return {
            getPokemon: name => dispatch(getPokemon(name))
        };
      }
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Search);