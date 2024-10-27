import React, { useState } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import './FormCreateAdvisor.css'; 

const FormCreateAdvisor = () => {
    const [advisorName, setAdvisorName] = useState('');
    const [advisorEmail, setAdvisorEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('advisors')
            .insert([{ name: advisorName, email: advisorEmail }]);

        if (error) {
            console.error(error);
            setMessage('Error creando el asesor.');
        } else {
            setMessage('Asesor creado exitosamente.');
            setAdvisorName(''); 
            setAdvisorEmail(''); 

            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Crear Asesor</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="advisorName">Nombre del Asesor</label>
                    <input
                        type="text"
                        id="advisorName"
                        value={advisorName}
                        onChange={(e) => setAdvisorName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="advisorEmail">Email</label>
                    <input
                        type="email"
                        id="advisorEmail"
                        value={advisorEmail}
                        onChange={(e) => setAdvisorEmail(e.target.value)}
                        required
                    />
                </div>

                <button 
                    className='form-button-submit'
                    type="submit">
                    Crear Asesor
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default FormCreateAdvisor;
