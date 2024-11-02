import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/supabaseClient';
import Notification from '../../notification/Notification';

const FormDeleteCourse = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [messageOK, setMessageOK] = useState('');
    const [messageBad, setMessageBad] = useState('');



    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase.from('courses').select('*');
            if (error) {
                console.error('Error fetching courses:', error);
            } else {
                setCourses(data);
            }
        };
        fetchCourses();
    }, []);

    const handleDelete = async () => {
        if (selectedCourse) {
            const { error } = await supabase.from('courses').delete().eq('id', selectedCourse);
            if (error) {
                console.error('Error deleting course:', error);
                setMessageBad('Error eliminando el curso.');
            } else {
                setMessageOK('Curso eliminado exitosamente.');
                setCourses(courses.filter(course => course.id !== selectedCourse));
                setSelectedCourse('');
                setConfirmDelete(false);

                setTimeout(() => {
                    setMessageOK('');
                    setMessageBad('');
                }, 4000);
            }
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Eliminar Curso</h2>
            <div className="form-group">
                <label htmlFor="courseSelect">Selecciona un curso para eliminar:</label>
                <select
                    id="courseSelect"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    required
                >
                    <option value="">Selecciona un curso</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCourse && (
                <button
                    onClick={() => setConfirmDelete(true)}
                    className="delete-button"
                >
                    Eliminar Curso
                </button>
            )}
            {confirmDelete && (
                <div className="confirm-delete">
                    <p>¿Estás seguro de que deseas eliminar este curso?</p>
                    <button onClick={handleDelete} className="confirm-button">Sí, eliminar</button>
                    <button onClick={() => setConfirmDelete(false)} className="cancel-button">Cancelar</button>
                </div>
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

export default FormDeleteCourse;
