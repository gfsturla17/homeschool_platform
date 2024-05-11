import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderSheet.scss'
import { NavLink } from 'react-router-dom';

interface Props {
    // Add props if needed
}


const Header: React.FC<Props> = () => {
    return (
        <div className="header">
            <div className="header__menu">
                <NavLink to="/home" className={({ isActive }) => `header__menu-item ${isActive ? 'current' : ''}`}>Home</NavLink>
                <NavLink to="/resources" className={({ isActive }) => `header__menu-item ${isActive ? 'current' : ''}`}>Resources</NavLink>
            </div>
        </div>
    );
};

export default Header;