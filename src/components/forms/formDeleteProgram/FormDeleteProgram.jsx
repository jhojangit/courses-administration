import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import Notification from '../../notification/Notification';

const FormDeleteProgram = () => {
    const [programs, setPrograms] = useState([]);
    const [selectedProgramId, setSelectedProgramId] = useState('');
    const [messageOK, setMessageOK] = useState('');
    const [messageBad, setMessageBad] = useState('');


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
            setMessageBad('Error eliminando el Programa.');
        } else {
            setMessageOK('Programa eliminado exitosamente.');
            setSelectedProgramId('');
            setPrograms((prevPrograms) => 
                prevPrograms.filter((program) => program.id !== selectedProgramId)
            );

            setTimeout(() => {
                setMessageOK('');
                setMessageBad('');
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

export default FormDeleteProgram;
