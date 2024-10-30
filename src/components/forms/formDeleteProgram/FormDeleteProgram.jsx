import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';

const FormDeleteProgram = () => {
    const [programs, setPrograms] = useState([]);
    const [selectedProgramId, setSelectedProgramId] = useState('');
    const [message, setMessage] = useState('');

    // Obtener programas de la base de datos al cargar el componente
    useEffect(() => {
        const fetchPrograms = async () => {
            const { data, error } = await supabase
                .from('programs')
                .select('*');

            if (error) {
                console.error('Error fetching programs:', error);
            } else {
                setPrograms(data);
            }
        };

        fetchPrograms();
    }, []);

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('programs')
            .delete()
            .eq('id', selectedProgramId);

        if (error) {
            console.error(error);
            setMessage('Error eliminando el Programa.');
        } else {
            setMessage('Programa eliminado exitosamente.');
            setSelectedProgramId('');
            setPrograms((prevPrograms) => 
                prevPrograms.filter((program) => program.id !== selectedProgramId)
            );

            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Eliminar Programa</h2>

            <div className="form-group">
                <label htmlFor="programSelect">Selecciona un Programa</label>
                <select 
                    id="programSelect" 
                    value={selectedProgramId} 
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    required
                >
                    <option value="">Selecciona un programa</option>
                    {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program.name}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleDelete} disabled={!selectedProgramId}>
                Eliminar Programa
            </button>

            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default FormDeleteProgram;
