import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import Notification from '../../notification/Notification';

const FormUpdateFaculty = () => {
    const [faculties, setFaculties] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [dean, setDean] = useState('');
    const [deanEmail, setDeanEmail] = useState('');
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

    const handleFacultySelect = async (e) => {
        const facultyId = e.target.value;
        setSelectedFacultyId(facultyId);

        if (facultyId) {
            const { data: facultyData } = await supabase
                .from('faculties')
                .select('*')
                .eq('id', facultyId)
                .single();

            setFacultyName(facultyData.name);
            setDean(facultyData.dean);
            setDeanEmail(facultyData.dean_email);
        } else {
            setFacultyName('');
            setDean('');
            setDeanEmail('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('faculties')
            .update({ name: facultyName, dean: dean, dean_email: deanEmail })
            .eq('id', selectedFacultyId);

        if (error) {
            console.error(error);
            setMessageBad('Error actualizando la Facultad.');
        } else {
            setMessageOK('Facultad actualizada exitosamente.');
            setSelectedFacultyId('');
            setFacultyName('');
            setDean('');
            setDeanEmail('');

            setTimeout(() => {
                setMessageOK('');
                setMessageBad('');
            }, 5000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Actualizar Facultad</h2>
            <div className="form-group">
                <label htmlFor="facultySelect">Selecciona Facultad</label>
                <select
                    id="facultySelect"
                    value={selectedFacultyId}
                    onChange={handleFacultySelect}
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

                    <button type="submit">Actualizar Facultad</button>
                </form>
            )}
                        {
                messageOK 
                    && 
                    <Notification 
                        message={messageOK} 
                        type={"success"} 
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

export default FormUpdateFaculty;
