import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import Notification from '../../notification/Notification';

const FormUpdateAdvisor = () => {
    const [advisors, setAdvisors] = useState([]);
    const [selectedAdvisorId, setSelectedAdvisorId] = useState('');
    const [advisorName, setAdvisorName] = useState('');
    const [advisorEmail, setAdvisorEmail] = useState('');
    const [messageOK, setMessageOK] = useState('');
    const [messageBad, setMessageBad] = useState('');

    // Fetch advisors from the database
    useEffect(() => {
        const fetchAdvisors = async () => {
            const { data, error } = await supabase.from('advisors').select('*');
            if (error) {
                console.error(error);
            } else {
                setAdvisors(data);
            }
        };

        fetchAdvisors();
    }, []);

    const handleAdvisorChange = async (e) => {
        const id = e.target.value;
        setSelectedAdvisorId(id);

        // Fetch selected advisor details
        if (id) {
            const { data, error } = await supabase.from('advisors').select('*').eq('id', id).single();
            if (error) {
                console.error(error);
            } else {
                setAdvisorName(data.name);
                setAdvisorEmail(data.email);
            }
        } else {
            setAdvisorName('');
            setAdvisorEmail('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('advisors')
            .update({ name: advisorName, email: advisorEmail })
            .eq('id', selectedAdvisorId);

        if (error) {
            console.error(error);
            setMessageBad('Error actualizando el asesor.');
        } else {
            setMessageOK('Asesor actualizado exitosamente.');
            setSelectedAdvisorId('');
            setAdvisorName('');
            setAdvisorEmail('');

            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Actualizar Asesor</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="advisorSelect">Seleccionar Asesor</label>
                    <select
                        id="advisorSelect"
                        value={selectedAdvisorId}
                        onChange={handleAdvisorChange}
                        required
                    >
                        <option value="">Seleccione un asesor</option>
                        {advisors.map((advisor) => (
                            <option key={advisor.id} value={advisor.id}>
                                {advisor.name}
                            </option>
                        ))}
                    </select>
                </div>

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
                    Actualizar Asesor
                </button>
            </form>
            {
                messageOK 
                    && 
                    <Notification 
                        message={messageOK} 
                        type={"succes"} 
                    />
            }

            {
                messageBad 
                    && 
                    <Notification 
                        message={messageBad} 
                        type={"error"} 
                    />
            }
        </div>
    );
};

export default FormUpdateAdvisor;
