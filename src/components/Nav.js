import React from "react";
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <NavLink to='/'>sunsets</NavLink>
                </li>
                <li>
                    <NavLink to='#'>waterfalls</NavLink>
                </li>
                <li>
                    <NavLink to='#'>rainbows</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;