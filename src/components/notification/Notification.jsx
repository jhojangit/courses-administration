import React, { useEffect, useState } from 'react';
import './Notification.css';



const Notification = ({ message, type = 'success' }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false); // Esconde la notificación después de 3 segundos
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null; // Si no está visible, no se renderiza nada




    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
            <button className="close-btn" onClick={() => setIsVisible(false)}>✖</button>
        </div>
    );
};

export default Notification;



/*  USAGE

{notification && (
    <Notification 
        message={"Somthing"} 
        type={"success" or "error"} 
    />
)}

 */