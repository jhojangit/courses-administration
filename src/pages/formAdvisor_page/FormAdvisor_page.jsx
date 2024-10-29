import React, { useState } from 'react';
import FormCreateAdvisor from '../../components/forms/formCreateAdvisor/FormCreateAdvisor';
import FormUpdateAdvisor from '../../components/forms/formUpdateAdvisor/FormUpdateAdvisor';
import FormDeleteAdvisor from '../../components/forms/formDeleteAdvisor/FormDeleteAdvisor';
import './FormAdvisor_page.css';

const FormCreateAdvisorPage = () => {
    const [visibleForm, setVisibleForm] = useState(null);

    const toggleForm = (form) => {
        setVisibleForm((prev) => (prev === form ? null : form));
    };

    return (
        <div className="form-page-container">
            <div className="form-buttons-advisor">
                <button 
                    onClick={() => toggleForm('create')} 
                    className={`toggle-button ${visibleForm === 'create' ? 'active' : ''}`}>
                    Crear Asesor
                </button>
                <button 
                    onClick={() => toggleForm('update')} 
                    className={`toggle-button ${visibleForm === 'update' ? 'active' : ''}`}>
                    Actualizar Asesor
                </button>
                <button 
                    onClick={() => toggleForm('delete')} 
                    className={`toggle-button ${visibleForm === 'delete' ? 'active' : ''}`}>
                    Eliminar Asesor
                </button>
            </div>

            <div className="form-container-advisor">
                {visibleForm === 'create' && <FormCreateAdvisor />}
                {visibleForm === 'update' && <FormUpdateAdvisor />}
                {visibleForm === 'delete' && <FormDeleteAdvisor />}
            </div>
        </div>
    );
};

export default FormCreateAdvisorPage;
