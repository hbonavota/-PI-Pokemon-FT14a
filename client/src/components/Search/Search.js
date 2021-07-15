import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import {getPokemon} from "../../actions/index.js"
import { connect } from "react-redux";
import './Search.css';


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
        //this.setState({ name: event.target.value });
        this.props.getPokemon(this.state.name);
      }
    
      render() {
        const { byname } = this.state;

        let composemap = ()=>{
          if(this.props.pokes.error){
            return <h1>"pokemon no encontrado =("</h1>
          }else{
           return this.props.pokes.map(el =>(
            <div Key={el.id}>
              
              <NavLink to={`/pokemons/${el.id}`}>{el.name}</NavLink>
  
            </div>
           ));
          }
          }

          console.log("composemap",composemap())

        return (
          <div>
            <h2>Buscador</h2>
            <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
              <div>
                <label className="label" htmlFor="name">Pokemon :</label>
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  value={byname}
                  onChange={(e) => this.handleChange(e) }
                  required
                />
              </div>
              <button type="submit">BUSCAR</button>
            </form>
            
            <div>
              {composemap()}
             {/* {this.props.pokes && this.props.pokes.map(el =>(
              <div Key={el.id}>
                
                <NavLink to={`/pokemons/${el.id}`}>{el.name}</NavLink>

              </div>
             ))
             } */}
            </div>
          </div>
        );
      }
    }

    function mapStateToProps(state) {
        return {
            pokes: state.pokemons
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