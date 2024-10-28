import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import './CourseDetails.css';

const CourseDetails = ({ advisorId, courseId }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [courseDetails, setCourseDetails] = useState(null);
    const [expandedSections, setExpandedSections] = useState({
        planning: false,
        start: false,
        module_1: false,
        module_2: false,
        module_3: false,
        module_4: false,
        closing: false,
    });

    useEffect(() => {
        const fetchCourses = async () => {
            let query = supabase.from('courses').select('*');

            // Si hay un advisorId, filtrar por ese ID
            if (advisorId) {
                query = query.eq('advisor_id', advisorId);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching courses:', error);
            } else {
                setCourses(data);
                // Si hay un courseId pasado, seleccionar ese curso
                if (courseId) {
                    setSelectedCourseId(courseId);
                } else {
                    setSelectedCourseId(''); // Resetea a vacío si no hay courseId
                }
            }
        };

        fetchCourses();
    }, [advisorId, courseId]);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (selectedCourseId) {
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
                    .eq('id', selectedCourseId)
                    .single();

                if (error) {
                    console.error('Error fetching course details:', error);
                } else {
                    setCourseDetails(data);
                }
            } else {
                setCourseDetails(null); // Resetea los detalles si no hay curso seleccionado
            }
        };

        fetchCourseDetails();
    }, [selectedCourseId]);

    // Función para obtener los detalles del asesor y sus cursos
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
                )
            `)
            .eq('id', advisorId)
            .single();

        if (error) {
            console.error('Error fetching advisor details:', error);
        } else {
            setCourses(data.courses || []); // Actualiza el estado de cursos
        }
    };

    useEffect(() => {
        if (advisorId) {
            fetchAdvisorDetails(advisorId);
        }
    }, [advisorId]);

    const handleCourseChange = (e) => {
        setSelectedCourseId(e.target.value);
    };

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };
    return (
        <div className="course-details-container">
            <h2>Detalles del Curso</h2>
            <select value={selectedCourseId} onChange={handleCourseChange} className="course-select">
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

                    {/* Módulo 1 */}
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
                        </div>
                    )}


                    {/* Módulo 2 */}
                    <h3 onClick={() => toggleSection('module_2')} className="section-header">
                        Módulo 2
                    </h3>
                    {expandedSections.module_2 && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Guía de Aprendizaje:</span>
                                <span className="field-value">{courseDetails.module_2[0]?.guia_aprendizaje}</span>
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
                        </div>
                    )}


                    {/* Módulo 3 */}
                    <h3 onClick={() => toggleSection('module_3')} className="section-header">
                        Módulo 3
                    </h3>
                    {expandedSections.module_3 && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Guía de Aprendizaje:</span>
                                <span className="field-value">{courseDetails.module_3[0]?.guia_aprendizaje}</span>
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
                        </div>
                    )}


                    {/* Módulo 4 */}
                    <h3 onClick={() => toggleSection('module_4')} className="section-header">
                        Módulo 4
                    </h3>
                    {expandedSections.module_4 && (
                        <div className="section-content">
                            <div className="field-row">
                                <span className="field-label">Guía de Aprendizaje:</span>
                                <span className="field-value">{courseDetails.module_4[0]?.guia_aprendizaje}</span>
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
                        </div>
                    )}


                    {/* Closing */}
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
                                <span className="field-label">Evaluación de percepción:</span>
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
