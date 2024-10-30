import React, { useState } from 'react';
import FormCreateFaculty from '../../../components/forms/formCreateFaculty/FormCreateFaculty';
import FormUpdateFaculty from '../../../components/forms/formUpdateFaculty/FormUpdateFaculty';
import FormDeleteFaculty from '../../../components/forms/FormDeleteFaculty/FormDeleteFaculty';
import '../../forms/Forms_page.css';

const FormCreateFacultyPage = () => {
    const [visibleForm, setVisibleForm] = useState(null);

    const toggleForm = (form) => {
        setVisibleForm((prev) => (prev === form ? null : form));
    };

    return (
        <div className="form-page-container">

            <h1>FACULTADES</h1>
            <div className="form-page-buttons">
                <button 
                    onClick={() => toggleForm('create')} 
                    className={`form-page-toggle-button ${visibleForm === 'create' ? 'active' : ''}`}>
                    Crear Facultad
                </button>
                <button 
                    onClick={() => toggleForm('update')} 
                    className={`form-page-toggle-button ${visibleForm === 'update' ? 'active' : ''}`}>
                    Actualizar Facultad
                </button>
                <button 
                    onClick={() => toggleForm('delete')} 
                    className={`form-page-toggle-button ${visibleForm === 'delete' ? 'active' : ''}`}>
                    Eliminar Facultad
                </button>
            </div>

            <div className="form-container-options">
                {visibleForm === 'create' && <FormCreateFaculty />}
                {visibleForm === 'update' && <FormUpdateFaculty />}
                {visibleForm === 'delete' && <FormDeleteFaculty />}
            </div>
        </div>
    );
};

export default FormCreateFacultyPage;
