import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../logo.png'
import './NavBar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                <img id="logo" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            </div>
            <nav>
            <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/Home" >HOME</NavLink>
                        <NavLink exact to="/Search" >SEARCH</NavLink>
                        <NavLink exact to="/addpokemon" >CREATE POKEMON</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}