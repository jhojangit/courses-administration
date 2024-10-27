import React from 'react';



const FormCreateModuleTwo = ({ moduleTwoData, onModuleTwoChange }) => {

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        onModuleTwoChange(name, value);  
    };

    return (
        <form className="form">
            <h3>Crear Módulo Dos</h3>

            {/* Campo: Guía de Aprendizaje */}
            <div className="form-group">
                <label htmlFor="guia_aprendizaje">Guía de Aprendizaje</label>
                <input
                    type="text"
                    id="guia_aprendizaje"
                    name="guia_aprendizaje"
                    value={moduleTwoData.guia_aprendizaje}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Recursos Externos */}
            <div className="form-group">
                <label htmlFor="recursos_externos">Recursos Externos</label>
                <input
                    type="text"
                    id="recursos_externos"
                    name="recursos_externos"
                    value={moduleTwoData.recursos_externos  || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Recursos Propios */}
            <div className="form-group">
                <label htmlFor="recursos_propios">Recursos Propios</label>
                <input
                    type="text"
                    id="recursos_propios"
                    name="recursos_propios"
                    value={moduleTwoData.recursos_propios  || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Actividades */}
            <div className="form-group">
                <label htmlFor="actividades">Actividades</label>
                <input
                    type="text"
                    id="actividades"
                    name="actividades"
                    value={moduleTwoData.actividades  || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Rúbricas */}
            <div className="form-group">
                <label htmlFor="rubricas">Rúbricas</label>
                <input
                    type="text"
                    id="rubricas"
                    name="rubricas"
                    value={moduleTwoData.rubricas  || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Evaluación */}
            <div className="form-group">
                <label htmlFor="evaluacion">Evaluación</label>
                <input
                    type="text"
                    id="evaluacion"
                    name="evaluacion"
                    value={moduleTwoData.evaluacion  || ""}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
};

export default FormCreateModuleTwo;
