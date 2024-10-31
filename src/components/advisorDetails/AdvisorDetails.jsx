import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import CourseDetails from '../CourseDetails/CourseDetails';
import './AdvisorDetails.css';

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
            <h2 className="advisor-title">Asesor</h2>
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
                    <h3 className="advisor-title">{advisorDetails.name}</h3>

                    <div className="advisor-section-content">
                            <div className="course-list">
                                <h4 className="advisor-section-courses">Cursos Asignados</h4>
                                {advisorDetails.courses.map(course => (
                                    <div key={course.id} className="course-item">
                                        <span
                                            className="course-name"
                                            onClick={() => setSelectedCourseId(course.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {course.name}  (Facultad: {course?.program_id.faculty_id?.name})
                                        </span>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
            )}


            {selectedCourseId && (
                <CourseDetails advisorId={selectedAdvisor} courseId={selectedCourseId} filter={false} />
            )}
        </div>
    );

};

export default AdvisorsDetails;
