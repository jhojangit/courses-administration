import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import FormPlanning from '../../components/formPlanning/FormPlanning';
import FormStart from '../../components/FormStart/FormStart';
import FormCreateModuleOne from '../../components/FormCreateModuleOne/FormCreateModuleOne';

import './FormCreatePhases_page.css'; 



const FormCreatePhasesPage = () => {
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]);
    const [planningData, setPlanningData] = useState({
        acta_de_inicio: '',
        matriz_de_coherencia: '',
        diseño_instruccional: ''
    });
    const [startData, setStartData] = useState({
        banner: '',
        caratulas: '',
        presentacion_docente: '',
        presentacion_curso: '',
        acuerdos: '',
        cronograma: '',
        normas_citacion: '',
        diagnostico: '',
        en_aula: '',
        url_aula: ''
    });

    const [moduleOneData, setModuleOneData] = useState({
        guia_aprendizaje: '',
        recursos_externos: '',
        recursos_propios: '',
        actividades: '',
        rubricas: '',
        evaluacion: ''
    });






    const [message, setMessage] = useState('');





    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase.from('courses').select('*');
            if (error) console.error('Error fetching courses:', error);
            else setCourses(data);
        };
        fetchCourses();
    }, []);

    const handleCourseSelection = async (e) => {
        const selectedCourseId = e.target.value;
        setCourseId(selectedCourseId);
    
        if (selectedCourseId) {
            // Fetch planning data
            const { data: planningData, error: planningError } = await supabase
                .from('planning')
                .select('*')
                .eq('course_id', selectedCourseId)
                .single();
    
            if (planningError) {
                console.error('Error fetching planning data:', planningError);
            } else {
                setPlanningData(planningData || {
                    acta_de_inicio: '',
                    matriz_de_coherencia: '',
                    diseño_instruccional: ''
                });
            }
    
            // Fetch start data
            const { data: startData, error: startError } = await supabase
                .from('start')
                .select('*')
                .eq('course_id', selectedCourseId)
                .single(); // Cambia a .single() si esperas un solo registro
    
            if (startError) {
                console.error('Error fetching start data:', startError);
            } else {
                setStartData(startData || {
                    banner: '',
                    caratulas: '',
                    presentacion_docente: '',
                    presentacion_curso: '',
                    acuerdos: '',
                    cronograma: '',
                    normas_citacion: '',
                    diagnostico: '',
                    en_aula: '',
                    url_aula: ''
                });
            }


            // Fetch mnodule 1 data
            const { data: moduleOneData, error: moduleOneError } = await supabase
            .from('module_1')
            .select('*')
            .eq('course_id', selectedCourseId)
            .single(); 

            if (moduleOneError) {
                console.error('Error fetching module_1 data:', moduleOneError);
            } else {
                setModuleOneData(moduleOneData || {
                    guia_aprendizaje: '',
                    recursos_externos: '',
                    recursos_propios: '',
                    actividades: '',
                    rubricas: '',
                    evaluacion: ''
                });
            }
        }
    };
    

    const handlePlanningChange = (field, value) => {
        setPlanningData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleStartChange = (field, value) => {
        setStartData((prevData) => ({ ...prevData, [field]: value }));
    };


    const handleModuleOneChange = (field, value) => {
        setModuleOneData((prevData) => ({ ...prevData, [field]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { error: planningError } = await supabase
            .from('planning')
            .upsert([{
                ...planningData,
                course_id: courseId
            }]);

        const { error: startError } = await supabase
            .from('start')
            .upsert([{
                ...startData,
                course_id: courseId
            }]);


        const { error: moduleOneError } = await supabase
            .from('module_1')
            .upsert([{
                ...moduleOneData,
                course_id: courseId
            }]);

        if (planningError || startError || moduleOneError) {
            console.error('Error al guardar los registros:', planningError || startError || moduleOneError);
            setMessage('Error al guardar los registros.');
        } else {
            setMessage('Registros guardados exitosamente.');
            setTimeout(() => setMessage(''), 4000);
        }
    };

    return (
        <div className="form-create-phases-container">
            <h2 className="form-title">Crear/Editar Planeación y Sección de Inicio</h2>

            <div className="form-group">
                <label htmlFor="courseId">Selecciona un Curso</label>
                <select id="courseId" value={courseId} onChange={handleCourseSelection} required>
                    <option value="">Selecciona un curso</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            {courseId && (
                <>
                    <FormPlanning
                        planningData={planningData}
                        onPlanningChange={handlePlanningChange}
                    />
                    <FormStart
                        startData={startData}
                        onStartChange={handleStartChange}
                    />

                    <FormCreateModuleOne
                        moduleOneData={moduleOneData}
                        onModuleOneChange={handleModuleOneChange}
                    />


                </>
            )}

            <button onClick={handleSubmit} className="submit-button">
                Guardar Planeación y Sección de Inicio
            </button>

            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default FormCreatePhasesPage;
