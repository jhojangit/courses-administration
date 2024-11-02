import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import Notification from '../../notification/Notification';


const FormUpdateCourse = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
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
    const [messageOK, setMessageOK] = useState('');
    const [messageBad, setMessageBad] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const { data: programData } = await supabase.from('programs').select('*');
            setPrograms(programData || []);

            const { data: advisorData } = await supabase.from('advisors').select('*');
            setAdvisors(advisorData || []);

            const { data: courseData } = await supabase.from('courses').select('*');
            setCourses(courseData || []);
        };

        fetchData();
    }, []);

    const handleCourseSelect = async (courseId) => {
        setSelectedCourseId(courseId);

        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (data) {
            setCourseName(data.name || '');
            setCredits(data.credits || '');
            setTeacher(data.teacher || '');
            setHpa(data.hpa || '');
            setAcademicPeriod(data.academic_period || '');
            setUrlDrive(data.url_drive || '');
            setPrerequisites(data.prerequisites || '');
            setObservations(data.observations || '');
            setProgramId(data.program_id || '');
            setAdvisorId(data.advisor_id || '');
        }

        if (error) {
            console.error(error);
            setMessage('Error al cargar el curso.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('courses')
            .update({
                name: courseName,
                credits: credits,
                teacher: teacher,
                hpa: hpa,
                academic_period: academicPeriod,
                url_drive: urlDrive,
                prerequisites: prerequisites,
                observations: observations,
                program_id: programId,
                advisor_id: advisorId,
            })
            .eq('id', selectedCourseId);

        if (error) {
            console.error(error);
            setMessageBad('Error actualizando el curso.');
        } else {
            setMessageOK('Curso actualizado exitosamente.');
            setTimeout(() => {
                setMessageOK('');
                setMessageBad('');
            }, 4000);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Actualizar Curso</h2>
            <div className="form-group">
                <label htmlFor="course">Selecciona un curso</label>
                <select
                    id="course"
                    value={selectedCourseId}
                    onChange={(e) => handleCourseSelect(e.target.value)}
                    required
                >
                    <option value="">Selecciona un curso</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCourseId && (
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
                    <button type="submit">Actualizar Curso</button>
                </form>
            )}
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

export default FormUpdateCourse;
