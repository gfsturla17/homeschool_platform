import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderSheet.scss'
import { NavLink } from 'react-router-dom';
import logo from '../icons/logo_1.png'; // Import the logo here

interface Props {
    isLoggedIn: boolean;
}

const Header: React.FC<Props> = ({ isLoggedIn }) => {
    return (
        <div className={isLoggedIn ? "header" : "header__banner"}>
            <div className="header__logo">
                <img src={logo} alt="Logo" />
            </div>
            {!isLoggedIn && (
                <h1></h1>
            )}
            {isLoggedIn && (
                <div className="header__menu">
                    <NavLink to="/home" className={({ isActive }) => `header__menu-item ${isActive ? 'current' : ''}`}>Home</NavLink>
                    <NavLink to="/resources" className={({ isActive }) => `header__menu-item ${isActive ? 'current' : ''}`}>Resources</NavLink>
                </div>
            )}
        </div>
    );
};

export default Header;