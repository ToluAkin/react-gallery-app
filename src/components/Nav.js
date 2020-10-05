import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

const Nav = ({ match }) => {
    return (
        <BrowserRouter>
            <Switch>
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
            </Switch>
        </BrowserRouter>
    );
}

export default Nav;