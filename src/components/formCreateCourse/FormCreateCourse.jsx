import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import './FormCreateCourse.css'; 

const FormCreateCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [credits, setCredits] = useState('');
    const [teacher, setTeacher] = useState('');
    const [hpa, setHpa] = useState('');
    const [academicPeriod, setAcademicPeriod] = useState('');
    const [urlDrive, setUrlDrive] = useState('');
    const [prerequisites, setPrerequisites] = useState('');
    const [observations, setObservations] = useState('');
    const [programs, setPrograms] = useState([]);
    const [advisors, setAdvisors] = useState([]);
    const [programId, setProgramId] = useState('');
    const [advisorId, setAdvisorId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: programData } = await supabase.from('programs').select('*');
            setPrograms(programData || []);

            const { data: advisorData } = await supabase.from('advisors').select('*');
            setAdvisors(advisorData || []);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('courses')
            .insert([{
                name: courseName, 
                credits: credits, 
                teacher: teacher, 
                hpa: hpa, 
                academic_period: academicPeriod, 
                url_drive: urlDrive, 
                prerequisites: prerequisites,
                observations: observations,
                program_id: programId, 
                advisor_id: advisorId 
            }]);

        if (error) {
            console.error(error);
            setMessage('Error creando el curso.');
        } else {
            setMessage('Curso creado exitosamente.');
            // Limpiar el formulario
            setCourseName('');
            setCredits('');
            setTeacher('');
            setHpa('');
            setAcademicPeriod('');
            setUrlDrive('');
            setPrerequisites('');
            setObservations('');
            setProgramId('');
            setAdvisorId('');

            setTimeout(() => {
                setMessage('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Crear Curso</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="courseName">Nombre del Curso</label>
                    <input
                        type="text"
                        id="courseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="credits">Créditos</label>
                    <input
                        type="number"
                        id="credits"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="teacher">Docente</label>
                    <input
                        type="text"
                        id="teacher"
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hpa">Horas por Asignatura (HPA)</label>
                    <input
                        type="text"
                        id="hpa"
                        value={hpa}
                        onChange={(e) => setHpa(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="academicPeriod">Período Académico</label>
                    <input
                        type="text"
                        id="academicPeriod"
                        value={academicPeriod}
                        onChange={(e) => setAcademicPeriod(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="urlDrive">URL Drive</label>
                    <input
                        type="url"
                        id="urlDrive"
                        value={urlDrive}
                        onChange={(e) => setUrlDrive(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="prerequisites">Prerrequisitos</label>
                    <input
                        type="text"
                        id="prerequisites"
                        value={prerequisites}
                        onChange={(e) => setPrerequisites(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="observations">Observaciones</label>
                    <input
                        type="text"
                        id="observations"
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="program">Programa</label>
                    <select
                        id="program"
                        value={programId}
                        onChange={(e) => setProgramId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un programa</option>
                        {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="advisor">Asesor</label>
                    <select
                        id="advisor"
                        value={advisorId}
                        onChange={(e) => setAdvisorId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un asesor</option>
                        {advisors.map((advisor) => (
                            <option key={advisor.id} value={advisor.id}>
                                {advisor.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Crear Curso</button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default FormCreateCourse;
