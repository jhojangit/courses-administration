import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AsideMenu.css';

const AsideMenu = () => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation(); // Obtén la ubicación actual

    const toggleMenu = () => {
        setIsVisible(!isVisible);
    };

    const handleLinkClick = () => {
        setIsVisible(false); // Cierra el menú al hacer clic en un enlace
    };

    // Cierra el menú si la ubicación cambia
    React.useEffect(() => {
        setIsVisible(false);
    }, [location]);

    return (
        <div className={`aside-menu ${isVisible ? 'visible' : 'hidden'}`}>
            <button onClick={toggleMenu} className="menu-toggle-button">
                {isVisible ? '⮜' : '⮞'}
            </button>
            {isVisible && (
                <nav className="menu-links">
                    <ul>
                        <li><Link to="/" onClick={handleLinkClick}>Inicio</Link></li>
                        <li><Link to="/createadvisor" onClick={handleLinkClick}>Asesores</Link></li>
                        <li><Link to="/createcourse" onClick={handleLinkClick}>Cursos</Link></li>
                        <li><Link to="/createprogram" onClick={handleLinkClick}>Programas</Link></li>
                        <li><Link to="/createfaculty" onClick={handleLinkClick}>Facultades</Link></li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default AsideMenu;
