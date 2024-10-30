import React, { useState } from 'react';
import FormCreateAdvisor from '../../../components/forms/formCreateAdvisor/FormCreateAdvisor';
import FormUpdateAdvisor from '../../../components/forms/formUpdateAdvisor/FormUpdateAdvisor';
import FormDeleteAdvisor from '../../../components/forms/formDeleteAdvisor/FormDeleteAdvisor';
import '../../forms/Forms_page.css';


const FormCreateAdvisorPage = () => {
    const [visibleForm, setVisibleForm] = useState(null);

    const toggleForm = (form) => {
        setVisibleForm((prev) => (prev === form ? null : form));
    };

    return (
        <div className="form-page-container">

            <h1>ASESORES</h1>
            <div className="form-page-buttons">
                <button 
                    onClick={() => toggleForm('create')} 
                    className={`form-page-toggle-button ${visibleForm === 'create' ? 'active' : ''}`}>
                    Crear
                    <br />
                    <i className='bx bx-user-plus bx-md'></i>
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
                    <i className='bx bx-user-minus bx-md'></i>
                </button>
                
            </div>

            <div className="form-container-options">
                {visibleForm === 'create' && <FormCreateAdvisor />}
                {visibleForm === 'update' && <FormUpdateAdvisor />}
                {visibleForm === 'delete' && <FormDeleteAdvisor />}
            </div>
        </div>
    );
};

export default FormCreateAdvisorPage;
