import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import '../CourseDetails/CourseDetails.css'


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



    const [expandedSections, setExpandedSections] = useState({
        planning: false,
        start: false,
        module_1: false,
        module_2: false,
        module_3: false,
        module_4: false,
        closing: false
    });

    const toggleSection = (section) => {
        setExpandedSections((prevSections) => ({
            ...prevSections,
            [section]: !prevSections[section]
        }));
    };



    return (
        <div className="course-details-container">
            <h2>Selecciona un curso</h2>
            <select value={selectedCourse} onChange={handleCourseChange} className="course-select">
                <option value="">Seleccione un curso</option>
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                        {course.name}
                    </option>
                ))}
            </select>

            {courseDetails && (
                <div className="course-details">
                    <h3 className="course-title">{courseDetails.name}</h3>

                    {/* Planeación */}
                    <h3 onClick={() => toggleSection('planning')} className="section-header">
                        Planeación
                    </h3>
                    {expandedSections.planning && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Acta de Inicio:</span>
                                <span className="field-value">{courseDetails.planning[0]?.acta_de_inicio}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Matriz de Coherencia:</span>
                                <span className="field-value">{courseDetails.planning[0]?.matriz_de_coherencia}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Diseño Instruccional:</span>
                                <span className="field-value">{courseDetails.planning[0]?.diseño_instruccional}</span>
                            </div>
                        </div>
                    )}


                    {/* Inicio */}
                    <h3 onClick={() => toggleSection('start')} className="section-header">
                        Inicio
                    </h3>
                    {expandedSections.start && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Banner:</span>
                                <span className="field-value">{courseDetails.start[0]?.banner}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Carátulas:</span>
                                <span className="field-value">{courseDetails.start[0]?.caratulas}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Presentación Docente:</span>
                                <span className="field-value">{courseDetails.start[0]?.presentacion_docente}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Presentación del Curso:</span>
                                <span className="field-value">{courseDetails.start[0]?.presentacion_curso}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Acuerdos:</span>
                                <span className="field-value">{courseDetails.start[0]?.acuerdos}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Cronograma:</span>
                                <span className="field-value">{courseDetails.start[0]?.cronograma}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Normas de Citación:</span>
                                <span className="field-value">{courseDetails.start[0]?.normas_citacion}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Diagnóstico:</span>
                                <span className="field-value">{courseDetails.start[0]?.diagnostico}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">En Aula:</span>
                                <span className="field-value">{courseDetails.start[0]?.en_aula}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">URL Aula:</span>
                                <span className="field-value">{courseDetails.start[0]?.url_aula}</span>
                            </div>
                        </div>
                    )}



                    {/* Modulo 1 */}
                    <h3 onClick={() => toggleSection('module_1')} className="section-header">
                        Módulo 1
                    </h3>
                    {expandedSections.module_1 && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Guía de Aprendizaje:</span>
                                <span className="field-value">{courseDetails.module_1[0]?.guia_aprendizaje}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Externos:</span>
                                <span className="field-value">{courseDetails.module_1[0]?.recursos_externos}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Propios:</span>
                                <span className="field-value">{courseDetails.module_1[0]?.recursos_propios}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Actividades:</span>
                                <span className="field-value">{courseDetails.module_1[0]?.actividades}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Rúbricas:</span>
                                <span className="field-value">{courseDetails.module_1[0]?.rubricas}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Evaluación:</span>
                                <span className="field-value">{courseDetails.module_1[0]?.evaluacion}</span>
                            </div>
                        </div>
                    )}





                    {/* Modulo 2 */}
                    <h3 onClick={() => toggleSection('module_2')} className="section-header">
                        Módulo 2
                    </h3>
                    {expandedSections.module_2 && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Guía de Aprendizaje:</span>
                                <span className="field-value">{courseDetails.module_2[0]?.guia_aprendaje}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Externos:</span>
                                <span className="field-value">{courseDetails.module_2[0]?.recursos_externos}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Propios:</span>
                                <span className="field-value">{courseDetails.module_2[0]?.recursos_propios}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Actividades:</span>
                                <span className="field-value">{courseDetails.module_2[0]?.actividades}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Rúbricas:</span>
                                <span className="field-value">{courseDetails.module_2[0]?.rubricas}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Evaluación:</span>
                                <span className="field-value">{courseDetails.module_2[0]?.evaluacion}</span>
                            </div>
                        </div>
                    )}




                    {/* Modulo 3 */}
                    <h3 onClick={() => toggleSection('module_3')} className="section-header">
                        Módulo 3
                    </h3>
                    {expandedSections.module_3 && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Guía de Aprendizaje:</span>
                                <span className="field-value">{courseDetails.module_3[0]?.guia_aprendaje}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Externos:</span>
                                <span className="field-value">{courseDetails.module_3[0]?.recursos_externos}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Propios:</span>
                                <span className="field-value">{courseDetails.module_3[0]?.recursos_propios}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Actividades:</span>
                                <span className="field-value">{courseDetails.module_3[0]?.actividades}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Rúbricas:</span>
                                <span className="field-value">{courseDetails.module_3[0]?.rubricas}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Evaluación:</span>
                                <span className="field-value">{courseDetails.module_3[0]?.evaluacion}</span>
                            </div>
                        </div>
                    )}



                    {/* Modulo 4 */}
                    <h3 onClick={() => toggleSection('module_4')} className="section-header">
                        Módulo 4
                    </h3>
                    {expandedSections.module_4 && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Guía de Aprendizaje:</span>
                                <span className="field-value">{courseDetails.module_4[0]?.guia_aprendaje}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Externos:</span>
                                <span className="field-value">{courseDetails.module_4[0]?.recursos_externos}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Recursos Propios:</span>
                                <span className="field-value">{courseDetails.module_4[0]?.recursos_propios}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Actividades:</span>
                                <span className="field-value">{courseDetails.module_4[0]?.actividades}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Rúbricas:</span>
                                <span className="field-value">{courseDetails.module_4[0]?.rubricas}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Evaluación:</span>
                                <span className="field-value">{courseDetails.module_4[0]?.evaluacion}</span>
                            </div>
                        </div>
                    )}


                    {/* closing */}
                    <h3 onClick={() => toggleSection('closing')} className="section-header">
                        Cierre
                    </h3>

                    {expandedSections.closing && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Actividades de Cierre:</span>
                                <span className="field-value">{courseDetails.closing[0]?.actividades_cierre}</span>
                            </div>
                            <div className="field-row">
                                <span className="field-label">Evaluación de Percepción:</span>
                                <span className="field-value">{courseDetails.closing[0]?.evaluacion_percepcion}</span>
                            </div>
                        </div>
                    )}



                </div>
            )}
        </div>
    );
};

export default CourseDetails;
