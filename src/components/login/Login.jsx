import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationErrorPassword from '../notificationErrorPasswors/NotificationErrorPassword'; 
import './login.css'; 




const Login = () => {
    const [password, setPassword] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();


        const correctPassword = import.meta.env.VITE_PASSWORD_USER; 


/*         
        if (password === correctPassword) {
            sessionStorage.setItem('isLoggedIn', 'true');
            navigate('/home');
        } else {
            setShowNotification(true); // Mostrar la notificación de error
        }

*/


    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (showNotification) {
            setShowNotification(false); // Ocultar la notificación al empezar a escribir
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>

                <h2 className='login-title'>Campus virtual UAN</h2>

                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange} 
                    placeholder="Ingrese la contraseña"
                    required
                />

                <button className='login-submit' type="submit">Iniciar Sesión</button>

            </form>

            {showNotification && (
                <NotificationErrorPassword 
                    message="Contraseña incorrecta. Inténtalo de nuevo." 
                />
            )}
        </div>
    );
};



export default Login;
