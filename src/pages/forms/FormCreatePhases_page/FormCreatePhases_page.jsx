import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import FormPlanning from '../../../components/forms/formPlanning/FormPlanning';
import FormStart from '../../../components/forms/formStart/FormStart';
import FormCreateModuleOne from '../../../components/forms/FormCreateModuleOne/FormCreateModuleOne';
import FormCreateModuleTwo from '../../../components/forms/formCreateModuleTwo/FormCreateModuleTwo';
import FormCreateModuleThree from '../../../components/forms/formCreateModuleThree/FormCreateModuleThree';
import FormCreateModuleFour from '../../../components/forms/formCreateModuleFour/FormCreateModuleFour';
import FormClosing from '../../../components/forms/formClosing/FormClosing';
import { useParams } from 'react-router-dom';
import Notification from '../../../components/notification/Notification';






const FormCreatePhasesPage = () => {

    const { id } = useParams(); 



    const [courseId, setCourseId] = useState(id);
    const [courses, setCourses] = useState([]);
    const [planningData, setPlanningData] = useState({
        acta_de_inicio: false,
        matriz_de_coherencia: false,
        diseño_instruccional: false
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

    const moduleItemsRestart = {
        guia_aprendizaje: '',
        recursos_externos: '',
        recursos_propios: '',
        actividades: '',
        rubricas: '',
        evaluacion: ''
    }

    const [moduleOneData, setModuleOneData] = useState(moduleItemsRestart);

    const [moduleTwoData, setModuleTwoData] = useState(moduleItemsRestart);

    const [moduleThreeData, setModuleThreeData] = useState(moduleItemsRestart);

    const [moduleFourData, setModuleFourData] = useState(moduleItemsRestart);


    const [closingData, setClosingData] = useState({
        actividades_cierre: '',
        evaluacion_percepcion: '',
    });


    const [messageOK, setMessageOK] = useState('');
    const [messageBad, setMessageBad] = useState('');

    const courseName = courses.filter(course => course.id == id)



    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase.from('courses').select('*');
            if (error) console.error('Error fetching courses:', error);
            else setCourses(data);
        };
        fetchCourses();
        

        handleCourseSelection(id)
        
    }, []);
    


    const handleCourseSelection = async (e) => {

        const selectedCourseId = id || e.target.value;
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
                    acta_de_inicio: false,
                    matriz_de_coherencia: false,
                    diseño_instruccional: false
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
                setModuleOneData(moduleOneData || moduleItemsRestart);
            }


            // Fetch mnodule 2 data
            const { data: moduleTwoData, error: moduleTwoError } = await supabase
            .from('module_2')
            .select('*')
            .eq('course_id', selectedCourseId)
            .single(); 
    
            if (moduleTwoError) {
                console.error('Error fetching module_2 data:', moduleTwoError);
            } else {
                setModuleTwoData(moduleTwoData || moduleItemsRestart);
            }
        


            // Fetch mnodule 3 data
            const { data: moduleThreeData, error: moduleThreeError } = await supabase
            .from('module_3')
            .select('*')
            .eq('course_id', selectedCourseId)
            .single(); 
    
            if (moduleThreeError) {
                console.error('Error fetching module_3 data:', moduleThreeError);
            } else {
                setModuleThreeData(moduleThreeData || moduleItemsRestart);
            }


            // Fetch mnodule 4 data
            const { data: moduleFourData, error: moduleFourError } = await supabase
            .from('module_4')
            .select('*')
            .eq('course_id', selectedCourseId)
            .single(); 
    
            if (moduleFourError) {
                console.error('Error fetching module_4 data:', moduleFourError);
            } else {
                setModuleFourData(moduleFourData || moduleItemsRestart);
            }



            // Fetch closing data
            const { data: closingData, error: closingError } = await supabase
            .from('closing')
            .select('*')
            .eq('course_id', selectedCourseId)
            .single(); 
    
            if (closingError) {
                console.error('Error fetching closing data:', closingError);
            } else {
                setClosingData(closingData || {
                    actividades_cierre: '',
                    evaluacion_percepcion: '',
                });
            }


        };
        };
        
    
    


    


    

        const handlePlanningChange = (name, value) => {
            setPlanningData(prevData => ({
                ...prevData,
                [name]: value
            }));
        };

    const handleStartChange = (field, value) => {
        setStartData((prevData) => ({ ...prevData, [field]: value }));
    };


    const handleModuleOneChange = (field, value) => {
        setModuleOneData((prevData) => ({ ...prevData, [field]: value }));
    };


    const handleModuleTwoChange = (field, value) => {
        setModuleTwoData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleModuleThreeChange = (field, value) => {
        setModuleThreeData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleModuleFourChange = (field, value) => {
        setModuleFourData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleClosingChange = (field, value) => {
        setClosingData((prevData) => ({ ...prevData, [field]: value }));
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


            const { error: moduleTwoError } = await supabase
            .from('module_2')
            .upsert([{
                ...moduleTwoData,
                course_id: courseId
            }]);

            const { error: moduleThreeError } = await supabase
            .from('module_3')
            .upsert([{
                ...moduleThreeData,
                course_id: courseId
            }]);


            const { error: moduleFourError } = await supabase
            .from('module_4')
            .upsert([{
                ...moduleFourData,
                course_id: courseId
            }]);

            const { error: closingError } = await supabase
            .from('closing')
            .upsert([{
                ...closingData,
                course_id: courseId
            }]);


        if (planningError || startError || moduleOneError || moduleTwoError || moduleThreeError || moduleFourError || closingError) {
            console.error('Error al guardar los registros:',
                "planing", planningError ||
                "Start", startError ||
                "One", moduleOneError ||
                "two",  moduleTwoError ||
                "three", moduleThreeError ||
                "four", moduleFourError ||
                "Close", closingError
            );
            setMessageBad('Error registrando los datos.');

        } else {
            setMessageOK('Registros guardados exitosamente.');
            setTimeout(() => {
                setMessageOK('');
                setMessageBad('');
            }, 4000);
        }
    };



    return (
        <div className="form-page-container-phases">


            <h1>{courseName[0]?.name}</h1>

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

                    <FormCreateModuleTwo
                        moduleTwoData={moduleTwoData}
                        onModuleTwoChange={handleModuleTwoChange}
                    />

                    <FormCreateModuleThree
                        moduleThreeData={moduleThreeData}
                        onModuleThreeChange={handleModuleThreeChange}
                    />

                    <FormCreateModuleFour
                        moduleFourData={moduleFourData}
                        onModuleFourChange={handleModuleFourChange}
                    />

                    <FormClosing
                        closingData={closingData}
                        onClosingChange={handleClosingChange}
                    />

                </>
            )}

            <button onClick={handleSubmit} className="submit-button-phases">
                Guardar
            </button>


            {
                messageOK 
                    && 
                    <Notification 
                        message={messageOK} 
                        type={"success"} 
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

export default FormCreatePhasesPage;
