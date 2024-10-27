import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import './FormCreateProgram.css'; 

const FormCreateProgram = () => {
    const [programName, setProgramName] = useState('');
    const [coordinator, setCoordinator] = useState('');
    const [coordinatorEmail, setCoordinatorEmail] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [faculties, setFaculties] = useState([]); 
    const [message, setMessage] = useState('');

    // Obtener las facultades de la tabla 'faculties' en Supabase al cargar el componente
    useEffect(() => {
        const fetchFaculties = async () => {
            const { data, error } = await supabase
                .from('faculties')
                .select('*');

            if (error) {
                console.error('Error fetching faculties:', error);
            } else {
                setFaculties(data);
            }
        };

        fetchFaculties();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('programs')
            .insert([{ 
                name: programName, 
                coordinator: coordinator, 
                email: coordinatorEmail,
                faculty_id: facultyId 
            }]);

        if (error) {
            console.error(error);
            setMessage('Error creando el Programa.');
        } else {
            setMessage('Programa creado exitosamente.');
            setProgramName(''); 
            setCoordinator(''); 
            setCoordinatorEmail('');
            setFacultyId(''); 

            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Crear Programa</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="programName">Nombre del Programa</label>
                    <input
                        type="text"
                        id="programName"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="coordinator">Nombre del Coordinador</label>
                    <input
                        type="text"
                        id="coordinator"
                        value={coordinator}
                        onChange={(e) => setCoordinator(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="coordinatorEmail">Email</label>
                    <input
                        type="email"
                        id="coordinatorEmail"
                        value={coordinatorEmail}
                        onChange={(e) => setCoordinatorEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="faculty">Facultad</label>
                    <select 
                        id="faculty" 
                        value={facultyId} 
                        onChange={(e) => setFacultyId(e.target.value)} 
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

                <button type="submit">Crear Programa</button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default FormCreateProgram;
