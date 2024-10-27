import React from 'react';
import './notificationErrorPassword.css'; 

const Notification = ({ message }) => {
    return (
        <div className="notification">
            <p>{message}</p>
        </div>
    );
};

export default Notification;
