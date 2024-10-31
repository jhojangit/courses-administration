import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import CourseDetails from '../CourseDetails/CourseDetails';
import './FacultyDetails.css';

const FacultyDetails = () => {
    const [faculties, setFaculties] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState('');
    const [selectedProgramId, setSelectedProgramId] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // Fetch de las facultades disponibles
    useEffect(() => {
        const fetchFaculties = async () => {
            const { data, error } = await supabase
                .from('faculties')
                .select('id, name');

            if (error) {
                console.error('Error fetching faculties:', error);
            } else {
                setFaculties(data);
            }
        };

        fetchFaculties();
    }, []);

    // Fetch de los programas por facultad seleccionada
    useEffect(() => {
        const fetchProgramsByFaculty = async () => {
            if (selectedFacultyId) {
                const { data, error } = await supabase
                    .from('programs')
                    .select('id, name')
                    .eq('faculty_id', selectedFacultyId);

                if (error) {
                    console.error('Error fetching programs:', error);
                } else {
                    setPrograms(data);
                }
            } else {
                setPrograms([]); // Resetear programas si no hay facultad seleccionada
            }
        };

        fetchProgramsByFaculty();
    }, [selectedFacultyId]);

    // Fetch de los cursos por programa seleccionado
    useEffect(() => {
        const fetchCoursesByProgram = async () => {
            if (selectedProgramId) {
                const { data, error } = await supabase
                    .from('courses')
                    .select(`
                        id,
                        name,
                        credits,
                        teacher,
                        hpa,
                        academic_period,
                        url_drive,
                        prerequisites,
                        observations,
                        advisor_id (name)
                    `)
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

    // Handler cuando se selecciona una facultad
    const handleFacultyChange = (e) => {
        const facultyId = e.target.value;
        setSelectedFacultyId(facultyId);
        setSelectedProgramId(''); // Resetear programa seleccionado
        setCourses([]); // Resetear cursos
        setPrograms([]); // Resetear programas
    };

    // Handler cuando se selecciona un programa
    const handleProgramChange = (e) => {
        setSelectedProgramId(e.target.value);
        setSelectedCourseId(null); // Resetear curso seleccionado
    };

    return (
        <div className="faculty-courses-container">
            <h2>Facultad</h2>
            <select value={selectedFacultyId} onChange={handleFacultyChange} className="faculty-select">
                <option value="">Seleccione una facultad</option>
                {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                    </option>
                ))}
            </select>

            <br />
            <br />
            <br />

            {programs.length > 0 && (
                <>
                    <h2>Programa</h2>
                    <select value={selectedProgramId} onChange={handleProgramChange} className="program-select">
                        <option value="">Seleccione un programa</option>
                        {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {courses.length > 0 ? (
                <div className="course-list">
                    <h3>Cursos Disponibles</h3>
                    {courses.map(course => (
                        <div key={course.id} className="course-item">
                            <span 
                                className="course-name" 
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

export default FacultyDetails;
