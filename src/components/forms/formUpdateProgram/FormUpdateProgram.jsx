import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import Notification from '../../notification/Notification';


const FormUpdateProgram = () => {
    const [programs, setPrograms] = useState([]);
    const [selectedProgramId, setSelectedProgramId] = useState('');
    const [programName, setProgramName] = useState('');
    const [coordinator, setCoordinator] = useState('');
    const [coordinatorEmail, setCoordinatorEmail] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [messageOK, setMessageOK] = useState('');
    const [messageBad, setMessageBad] = useState('');

    // Obtener las facultades y programas de la base de datos al cargar el componente
    useEffect(() => {
        const fetchFacultiesAndPrograms = async () => {
            const { data: facultiesData, error: facultiesError } = await supabase
                .from('faculties')
                .select('*');

            if (facultiesError) {
                console.error('Error fetching faculties:', facultiesError);
            } else {
                setFaculties(facultiesData);
            }

            const { data: programsData, error: programsError } = await supabase
                .from('programs')
                .select('*');

            if (programsError) {
                console.error('Error fetching programs:', programsError);
            } else {
                setPrograms(programsData);
            }
        };

        fetchFacultiesAndPrograms();
    }, []);

    const handleProgramSelect = async (e) => {
        const id = e.target.value;
        setSelectedProgramId(id);

        if (id) {
            const { data: programData, error } = await supabase
                .from('programs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching program:', error);
            } else {
                setProgramName(programData.name);
                setCoordinator(programData.coordinator);
                setCoordinatorEmail(programData.email);
                setFacultyId(programData.faculty_id);
            }
        } else {
            setProgramName('');
            setCoordinator('');
            setCoordinatorEmail('');
            setFacultyId('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('programs')
            .update({ 
                name: programName, 
                coordinator: coordinator, 
                email: coordinatorEmail, 
                faculty_id: facultyId 
            })
            .eq('id', selectedProgramId);

        if (error) {
            console.error(error);
            setMessageBad('Error actualizando el Programa.');
        } else {
            setMessageOK('Programa actualizado exitosamente.');
            setSelectedProgramId('');
            setProgramName(''); 
            setCoordinator(''); 
            setCoordinatorEmail('');
            setFacultyId(''); 

            setTimeout(() => {
                setMessageOK('');
                setMessageBad('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Actualizar Programa</h2>

            <div className="form-group">
                <label htmlFor="programSelect">Selecciona un Programa</label>
                <select 
                    id="programSelect" 
                    value={selectedProgramId} 
                    onChange={handleProgramSelect}
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

                <button type="submit">Actualizar Programa</button>
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

export default FormUpdateProgram;
