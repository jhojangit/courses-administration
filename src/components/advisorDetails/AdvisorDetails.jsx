import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import '../CourseDetails/CourseDetails.css';

const AdvisorsDetails = () => {
    const [advisors, setAdvisors] = useState([]);
    const [selectedAdvisor, setSelectedAdvisor] = useState('');
    const [advisorDetails, setAdvisorDetails] = useState(null);

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

    // Fetch de los detalles del asesor seleccionado
    const fetchAdvisorDetails = async (advisorId) => {
        const { data, error } = await supabase
            .from('advisors')
            .select(`
                name,
                email,
                courses (
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
        }
    };

    // Handler cuando se selecciona un asesor
    const handleAdvisorChange = (e) => {
        const advisorId = e.target.value;
        setSelectedAdvisor(advisorId);
        if (advisorId) {
            fetchAdvisorDetails(advisorId); // Fetch de los detalles del asesor seleccionado
        }
    };

    return (
        <div className="course-details-container">
            <h2>Selecciona un asesor</h2>
            <select value={selectedAdvisor} onChange={handleAdvisorChange} className="course-select">
                <option value="">Seleccione un asesor</option>
                {advisors.map((advisor) => (
                    <option key={advisor.name} value={advisor.id}>
                        {advisor.name}
                    </option>
                ))}
            </select>

            {advisorDetails && (
                <div className="course-details">
                    <h3 className="course-title"> {advisorDetails.email}</h3>


                    <h4>Cursos Asignados</h4>
                    {advisorDetails.courses.map(course => (
                        <div key={course.id} className="field-row">
                            <span className="field-label">Curso:</span>
                            <span className="field-value">{course.name} (Créditos: {course.credits}, Docente: {course.teacher})</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdvisorsDetails;