import React from 'react';
import AsideMenu from '../asideMenu/AsideMenu'; // Importa tu menú lateral
import './ProtectedLayout.css'; // Importa estilos si es necesario

const ProtectedLayout = ({ children }) => {
    return (
        <div className="protected-layout">
            <AsideMenu />
            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default ProtectedLayout;