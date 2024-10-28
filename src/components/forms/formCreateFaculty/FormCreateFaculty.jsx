import React, { useState } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import './FormCreateFaculty.css'; 

const FormCreateFaculty = () => {
    const [facultyName, setFacultyName] = useState('');
    const [dean, setDean] = useState('');
    const [deanEmail, setDeanEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('faculties')
            .insert([{ name: facultyName, dean: dean, dean_email: deanEmail }]);

        if (error) {
            console.error(error);
            setMessage('Error creando la Facultad.');
        } else {
            setMessage('Facultad creada exitosamente.');
            setFacultyName(''); 
            setDean(''); 
            setDeanEmail(''); 
                
            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">

            <h2 className='form-title'>Crear Facultad</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="facultyName">Nombre de la Facultad</label>
                    <input
                        type="text"
                        id="facultyName"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dean">Nombre de Decano</label>
                    <input
                        type="text"
                        id="dean"
                        value={dean}
                        onChange={(e) => setDean(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deanEmail">Email</label>
                    <input
                        type="email"
                        id="deanEmail"
                        value={deanEmail}
                        onChange={(e) => setDeanEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Crear Facultad</button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default FormCreateFaculty;