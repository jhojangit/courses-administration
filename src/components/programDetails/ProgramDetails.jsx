import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import CourseDetails from '../CourseDetails/CourseDetails';
import './ProgramDetails.css';


const ProgramDetails = () => {
    const [programs, setPrograms] = useState([]);
    const [selectedProgramId, setSelectedProgramId] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // Fetch de los programas disponibles
    useEffect(() => {
        const fetchPrograms = async () => {
            const { data, error } = await supabase
                .from('programs')
                .select('id, name');

            if (error) {
                console.error('Error fetching programs:', error);
            } else {
                setPrograms(data);
            }
        };

        fetchPrograms();
    }, []);

    // Fetch de los cursos por programa seleccionado
    useEffect(() => {
        const fetchCoursesByProgram = async () => {
            if (selectedProgramId) {
                const { data, error } = await supabase
                    .from('courses')
                    .select(`id, name`)
                    .eq('program_id', selectedProgramId);

                if (error) {
                    console.error('Error fetching courses:', error);
                } else {
                    setCourses(data);
                }
            } else {
                setCourses([]); // Resetear cursos si no hay programa seleccionado
            }
        };

        fetchCoursesByProgram();
    }, [selectedProgramId]);

    // Handler cuando se selecciona un programa
    const handleProgramChange = (e) => {
        setSelectedProgramId(e.target.value);
        setSelectedCourseId(null); // Resetear curso seleccionado
    };

    return (
        <div className="program-courses-container">
            <h2>Programa</h2>
            <select value={selectedProgramId || ''} onChange={handleProgramChange} className="program-select">
                <option value="">Seleccione un programa</option>
                {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                        {program.name}
                    </option>
                ))}
            </select>

            {courses.length > 0 ? (
                <div className="program-list">
                    <h3>Cursos Disponibles</h3>
                    {courses.map(course => (
                        <div key={course.id} className="program-item">
                            <span 
                                className="program-name" 
                                onClick={() => setSelectedCourseId(course.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {course.name} 
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                selectedProgramId && <p>No hay cursos disponibles para este programa.</p>
            )}

            {selectedCourseId && (
                <CourseDetails courseId={selectedCourseId} filter={false} />
            )}
        </div>
    );
};

export default ProgramDetails;
