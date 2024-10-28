import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import CourseDetails from '../CourseDetails/CourseDetails';
import './advisorDetails.css';

const AdvisorsDetails = () => {
    const [advisors, setAdvisors] = useState([]);
    const [selectedAdvisor, setSelectedAdvisor] = useState('');
    const [advisorDetails, setAdvisorDetails] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // Fetch de los asesores disponibles
    useEffect(() => {
        const fetchAdvisors = async () => {
            const { data, error } = await supabase
                .from('advisors')
                .select('id, name');

            if (error) {
                console.error('Error fetching advisors:', error);
            } else {
                setAdvisors(data);
            }
        };

        fetchAdvisors();
    }, []);

    // Fetch de los detalles del asesor y sus cursos
    const fetchAdvisorDetails = async (advisorId) => {
        const { data, error } = await supabase
            .from('advisors')
            .select(`
                name,
                email,
                courses (
                    id,
                    name,
                    credits,
                    teacher,
                    program_id (
                        name,
                        faculty_id (name)
                    )
                )
            `)
            .eq('id', advisorId)
            .single();

        if (error) {
            console.error('Error fetching advisor details:', error);
        } else {
            setAdvisorDetails(data);

            if (data.courses && data.courses.length > 0) {
                setSelectedCourseId(data.courses[0].id); // Mostrar automáticamente el primer curso
            } else {
                setSelectedCourseId(null);
            }
        }
    };

    // Handler cuando se selecciona un asesor
    const handleAdvisorChange = (e) => {
        const advisorId = e.target.value;
        setSelectedAdvisor(advisorId);
        setSelectedCourseId(null);
        if (advisorId) {
            fetchAdvisorDetails(advisorId);
        } else {
            setAdvisorDetails(null); // Resetear detalles si no se selecciona asesor
        }
    };

    return (
        <div className="advisor-details-container">
            <h2>Selecciona un asesor</h2>
            <select value={selectedAdvisor} onChange={handleAdvisorChange} className="advisor-select">
                <option value="">Seleccione un asesor</option>
                {advisors.map((advisor) => (
                    <option key={advisor.id} value={advisor.id}>
                        {advisor.name}
                    </option>
                ))}
            </select>

            {advisorDetails && (
                <div className="advisor-details">
                    <h3>{advisorDetails.name}</h3>
                    <h4>{advisorDetails.email}</h4>

                    <h4>Cursos Asignados</h4>
                    {advisorDetails.courses.map(course => (
                        <div key={course.id} className="advisor-field-row">
                            <span className="advisor-field-label">Curso:</span>
                            <span 
                                className="advisor-field-value" 
                                onClick={() => setSelectedCourseId(course.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {course.name} (Facultad: {course.program_id.faculty_id.name})
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {selectedCourseId && (
                <CourseDetails advisorId={selectedAdvisor} courseId={selectedCourseId} />
            )}
        </div>
    );
};

export default AdvisorsDetails;
