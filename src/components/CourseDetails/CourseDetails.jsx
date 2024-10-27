import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';


const CourseDetails = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseDetails, setCourseDetails] = useState(null);

    // Fetch de los cursos disponibles
    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase
                .from('courses') 
                .select('id, name');

            if (error) {
                console.error('Error fetching courses:', error);
            } else {
                setCourses(data);
            }
        };

        fetchCourses();
    }, []);

    // Fetch de los detalles del curso seleccionado
    const fetchCourseDetails = async (courseId) => {
        const { data, error } = await supabase
            .from('courses')
            .select(`
                name,
                credits,
                teacher,
                hpa,
                academic_period,
                url_drive,
                prerequisites,
                observations,
                advisor_id (name),
                program_id (
                    name,
                    faculty_id (name)
                ),
                planning (
                    acta_de_inicio,
                    matriz_de_coherencia,
                    diseño_instruccional
                ),
                start (
                    banner,
                    caratulas,
                    presentacion_docente,
                    presentacion_curso,
                    acuerdos,
                    cronograma,
                    normas_citacion,
                    diagnostico,
                    en_aula,
                    url_aula
                ),           
                module_1 (
                    guia_aprendizaje,
                    recursos_externos,
                    recursos_propios,
                    actividades,
                    rubricas,
                    evaluacion
                ),
                module_2 (
                    guia_aprendizaje,
                    recursos_externos,
                    recursos_propios,
                    actividades,
                    rubricas,
                    evaluacion
                ),
                module_3 (
                    guia_aprendizaje,
                    recursos_externos,
                    recursos_propios,
                    actividades,
                    rubricas,
                    evaluacion
                ),
                module_4 (
                    guia_aprendizaje,
                    recursos_externos,
                    recursos_propios,
                    actividades,
                    rubricas,
                    evaluacion
                ),
                closing (
                    actividades_cierre,
                    evaluacion_percepcion
                )

            `)
            .eq('id', courseId)
            .single();

        if (error) {
            console.error('Error fetching course details:', error);
        } else {
            setCourseDetails(data);
        }
    };

    // Handler cuando se selecciona un curso
    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        setSelectedCourse(courseId);
        if (courseId) {
            fetchCourseDetails(courseId); // Fetch de los detalles del curso seleccionado
        }
    };

    

    return (
        <div className="course-details-container">
            <h2>Selecciona un curso</h2>
            {/* Dropdown para seleccionar el curso */}
            <select value={selectedCourse} onChange={handleCourseChange}>
                <option value="">Seleccione un curso</option>
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                        {course.name}
                    </option>
                ))}
            </select>

            {/* Renderizado de los detalles del curso */}
            {courseDetails && (
                <div className="course-details">
                    <h3>Detalles del Curso: {courseDetails.name}</h3>

                    <p><strong>Créditos:</strong> {courseDetails.credits}</p>
                    <p><strong>Docente:</strong> {courseDetails.teacher}</p>
                    <p><strong>Horas por semana (HPA):</strong> {courseDetails.hpa}</p>
                    <p><strong>Periodo Académico:</strong> {courseDetails.academic_period}</p>
                    <p><strong>URL Drive:</strong> {courseDetails.url_drive}</p>
                    <p><strong>Prerequisitos:</strong> {courseDetails.prerequisites}</p>
                    <p><strong>Observaciones:</strong> {courseDetails.observations}</p>

                    <h4>Facultad: {courseDetails.program_id?.faculty_id.name}</h4>
                    <h4>Programa: {courseDetails.program_id?.name}</h4>
                    <h4>Asesor: {courseDetails.advisor_id?.name}</h4>

                    <h3>Planeación</h3>
                    <p><strong>Acta de Inicio:</strong> {courseDetails.planning[0]?.acta_de_inicio}</p>
                    <p><strong>Matriz de Coherencia:</strong> {courseDetails.planning[0]?.matriz_de_coherencia}</p>
                    <p><strong>Diseño Instruccional:</strong> {courseDetails.planning[0]?.diseño_instruccional}</p>

                    <h3>Inicio</h3>
                    <p><strong>Banner:</strong> {courseDetails.start[0]?.banner}</p>
                    <p><strong>Carátulas:</strong> {courseDetails.start[0]?.caratulas}</p>
                    <p><strong>Presentación Docente:</strong> {courseDetails.start[0]?.presentacion_docente}</p>
                    <p><strong>Presentación del Curso:</strong> {courseDetails.start[0]?.presentacion_curso}</p>
                    <p><strong>Acuerdos:</strong> {courseDetails.start[0]?.acuerdos}</p>
                    <p><strong>Cronograma:</strong> {courseDetails.start[0]?.cronograma}</p>
                    <p><strong>Normas de Citación:</strong> {courseDetails.start[0]?.normas_citacion}</p>
                    <p><strong>Diagnóstico:</strong> {courseDetails.start[0]?.diagnostico}</p>
                    <p><strong>En Aula:</strong> {courseDetails.start[0]?.en_aula}</p>
                    <p><strong>URL Aula:</strong> {courseDetails.start[0]?.url_aula}</p>


                    <h3>Modulo 1</h3>
                    <p><strong>Guia de aprendizaje:</strong> {courseDetails.module_1[0]?.guia_aprendizaje}</p>
                    <p><strong>Recursos externos  :</strong> {courseDetails.module_1[0]?.recursos_externos}</p>
                    <p><strong>Recursos propios   :</strong> {courseDetails.module_1[0]?.recursos_propios}</p>
                    <p><strong>Actividades        :</strong> {courseDetails.module_1[0]?.actividades}</p>
                    <p><strong>Rúbricas           :</strong> {courseDetails.module_1[0]?.rubricas}</p>
                    <p><strong>Evaluación         :</strong> {courseDetails.module_1[0]?.evaluacion}</p>


                    <h3>Modulo 2</h3>
                    <p><strong>Guia de aprendizaje:</strong> {courseDetails.module_2[0]?.guia_aprendizaje}</p>
                    <p><strong>Recursos externos  :</strong> {courseDetails.module_2[0]?.recursos_externos}</p>
                    <p><strong>Recursos propios   :</strong> {courseDetails.module_2[0]?.recursos_propios}</p>
                    <p><strong>Actividades        :</strong> {courseDetails.module_2[0]?.actividades}</p>
                    <p><strong>Rúbricas           :</strong> {courseDetails.module_2[0]?.rubricas}</p>
                    <p><strong>Evaluación         :</strong> {courseDetails.module_2[0]?.evaluacion}</p>

                    <h3>Modulo 3</h3>
                    <p><strong>Guia de aprendizaje:</strong> {courseDetails.module_3[0]?.guia_aprendizaje}</p>
                    <p><strong>Recursos externos  :</strong> {courseDetails.module_3[0]?.recursos_externos}</p>
                    <p><strong>Recursos propios   :</strong> {courseDetails.module_3[0]?.recursos_propios}</p>
                    <p><strong>Actividades        :</strong> {courseDetails.module_3[0]?.actividades}</p>
                    <p><strong>Rúbricas           :</strong> {courseDetails.module_3[0]?.rubricas}</p>
                    <p><strong>Evaluación         :</strong> {courseDetails.module_3[0]?.evaluacion}</p>


                    <h3>Modulo 4</h3>
                    <p><strong>Guia de aprendizaje:</strong> {courseDetails.module_4[0]?.guia_aprendizaje}</p>
                    <p><strong>Recursos externos  :</strong> {courseDetails.module_4[0]?.recursos_externos}</p>
                    <p><strong>Recursos propios   :</strong> {courseDetails.module_4[0]?.recursos_propios}</p>
                    <p><strong>Actividades        :</strong> {courseDetails.module_4[0]?.actividades}</p>
                    <p><strong>Rúbricas           :</strong> {courseDetails.module_4[0]?.rubricas}</p>
                    <p><strong>Evaluación         :</strong> {courseDetails.module_4[0]?.evaluacion}</p>


                    <h3>Cierre</h3>
                    <p><strong>Actividades de cierre:</strong> {courseDetails.closing[0]?.actividades_cierre}</p>
                    <p><strong>Evaluación de percepción  :</strong> {courseDetails.closing[0]?.evaluacion_percepcion}</p>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
