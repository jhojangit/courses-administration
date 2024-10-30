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
            <div className="form-page-buttons">
                <button 
                    onClick={() => toggleForm('create')} 
                    className={`form-page-toggle-button ${visibleForm === 'create' ? 'active' : ''}`}>
                    Crear
                    <br />
                    <i className='bx bx-layer-plus bx-md'></i>
                </button>
                <button 
                    onClick={() => toggleForm('update')} 
                    className={`form-page-toggle-button ${visibleForm === 'update' ? 'active' : ''}`}>
                    Actualizar
                    <br />
                    <i className='bx bxs-edit bx-md'></i>
                </button>
                <button 
                    onClick={() => toggleForm('delete')} 
                    className={`form-page-toggle-button ${visibleForm === 'delete' ? 'active' : ''}`}>
                    Eliminar
                    <br />
                    <i className='bx bx-layer-minus bx-md'></i>
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
