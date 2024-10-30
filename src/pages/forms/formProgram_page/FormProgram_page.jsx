import React, { useState } from 'react';
import FormCreateProgram from '../../../components/forms/formCreateProgram/FormCreateProgram';
import FormUpdateProgram from '../../../components/forms/formUpdateProgram/FormUpdateProgram';
import FormDeleteProgram from '../../../components/forms/formDeleteProgram/FormDeleteProgram';
import '../../forms/Forms_page.css';

const FormCreateProgram_page = () => {
    const [visibleForm, setVisibleForm] = useState(null);

    const toggleForm = (form) => {
        setVisibleForm((prev) => (prev === form ? null : form));
    };

    return (
        <div className="form-page-container">

            <h1>PROGRAMAS</h1>
            <div className="form-page-buttons ">
                <button 
                    onClick={() => toggleForm('create')} 
                    className={`form-page-toggle-button ${visibleForm === 'create' ? 'active' : ''}`}
                >
                    Crear Programa
                </button>
                <button 
                    onClick={() => toggleForm('update')} 
                    className={`form-page-toggle-button ${visibleForm === 'update' ? 'active' : ''}`}
                >
                    Actualizar Programa
                </button>
                <button 
                    onClick={() => toggleForm('delete')} 
                    className={`form-page-toggle-button ${visibleForm === 'delete' ? 'active' : ''}`}
                >
                    Eliminar Programa
                </button>
            </div>

            <div className="form-container-options">
                {visibleForm === 'create' && <FormCreateProgram />}
                {visibleForm === 'update' && <FormUpdateProgram />}
                {visibleForm === 'delete' && <FormDeleteProgram />}
            </div>
        </div>
    );
};

export default FormCreateProgram_page;
