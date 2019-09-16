import React from 'react';
import {NavLink} from 'react-router-dom'

function NavBar(){
    return(
        <div id='headerBar'>
            <div id='navCont'>
                <img src='./images/logo.png' alt='logo' height='48px' width='112px'/>
                <NavLink exact to="/" className='navObj'>Home</NavLink>
                <NavLink to="/devices" className='navObj'>Devices</NavLink>
                <NavLink to="/settings" className='navObj'>Settings</NavLink>
            </div>
        </div>
    );
}

export default NavBar