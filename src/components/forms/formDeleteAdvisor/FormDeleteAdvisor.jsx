import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';

const FormDeleteAdvisor = () => {
    const [advisors, setAdvisors] = useState([]);
    const [selectedAdvisorId, setSelectedAdvisorId] = useState('');
    const [message, setMessage] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('advisors')
            .delete()
            .eq('id', selectedAdvisorId);

        if (error) {
            console.error(error);
            setMessage('Error eliminando el asesor.');
        } else {
            setMessage('Asesor eliminado exitosamente.');
            setSelectedAdvisorId('');

            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Eliminar Asesor</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="advisorSelect">Seleccionar Asesor</label>
                    <select
                        id="advisorSelect"
                        value={selectedAdvisorId}
                        onChange={(e) => setSelectedAdvisorId(e.target.value)}
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

                <button 
                    className='form-button-submit'
                    type="submit">
                    Eliminar Asesor
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default FormDeleteAdvisor;
