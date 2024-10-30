import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import Notification from '../../notification/Notification';

const FormDeleteFaculty = () => {
    const [faculties, setFaculties] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState('');
    const [messageOK, setMessageOK] = useState('');
    const [messageBad, setMessageBad] = useState('');

    useEffect(() => {
        const fetchFaculties = async () => {
            const { data, error } = await supabase.from('faculties').select('*');
            if (error) console.error(error);
            else setFaculties(data || []);
        };

        fetchFaculties();
    }, []);

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('faculties')
            .delete()
            .eq('id', selectedFacultyId);

        if (error) {
            console.error(error);
            setMessageBad('Error eliminando la Facultad.');
        } else {
            setMessageOK('Facultad eliminada exitosamente.');
            setSelectedFacultyId('');
            // Actualizar la lista de facultades
            const updatedFaculties = faculties.filter(faculty => faculty.id !== selectedFacultyId);
            setFaculties(updatedFaculties);

            setTimeout(() => {
                setMessageBad('');
                setMessageOK('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Eliminar Facultad</h2>
            <div className="form-group">
                <label htmlFor="facultySelect">Selecciona Facultad</label>
                <select
                    id="facultySelect"
                    value={selectedFacultyId}
                    onChange={(e) => setSelectedFacultyId(e.target.value)}
                    required
                >
                    <option value="">Selecciona una facultad</option>
                    {faculties.map((faculty) => (
                        <option key={faculty.id} value={faculty.id}>
                            {faculty.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedFacultyId && (
                <button onClick={handleDelete} className="delete-button">
                    Eliminar Facultad
                </button>
            )}
            
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

export default FormDeleteFaculty;
