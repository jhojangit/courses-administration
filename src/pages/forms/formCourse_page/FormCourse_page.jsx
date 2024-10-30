import React, { useState } from 'react';
import FormCreateCourse from '../../../components/forms/formCreateCourse/FormCreateCourse';
import FormUpdateCourse from '../../../components/forms/formUpdateCourse/FormUpdateCourse';
import FormDeleteCourse from '../../../components/forms/formDeleteCourse/FormDeleteCourse';
import '../../forms/Forms_page.css';
const FormCoursePage = () => {
    const [visibleForm, setVisibleForm] = useState(null);

    const toggleForm = (form) => {
        setVisibleForm((prev) => (prev === form ? null : form));
    };

    return (
        <div className="form-page-container">

            <h1>CURSOS</h1>
            <div className="form-page-buttons">
                <button 
                    onClick={() => toggleForm('create')} 
                    className={`form-page-toggle-button ${visibleForm === 'create' ? 'active' : ''}`}>
                    Crear Curso
                </button>
                <button 
                    onClick={() => toggleForm('update')} 
                    className={`form-page-toggle-button ${visibleForm === 'update' ? 'active' : ''}`}>
                    Actualizar Curso
                </button>
                <button 
                    onClick={() => toggleForm('delete')} 
                    className={`form-page-toggle-button ${visibleForm === 'delete' ? 'active' : ''}`}>
                    Eliminar Curso
                </button>
            </div>

            <div className="form-container-options">
                {visibleForm === 'create' && <FormCreateCourse />}
                {visibleForm === 'update' && <FormUpdateCourse />}
                {visibleForm === 'delete' && <FormDeleteCourse />}
            </div>
        </div>
    );
};

export default FormCoursePage;
