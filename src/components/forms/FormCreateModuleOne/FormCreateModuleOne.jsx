import React from 'react';



const FormCreateModuleOne = ({ moduleOneData, onModuleOneChange }) => {

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        onModuleOneChange(name, value);  
    };

    return (
        <form className="form-phases">
            <h3>MÓDULO 1</h3>

            {/* Campo: Guía de Aprendizaje */}
            <div className="form-group-phases">
                <label htmlFor="guia_aprendizaje">Guía de Aprendizaje</label>
                <input
                    type="text"
                    id="guia_aprendizaje"
                    name="guia_aprendizaje"
                    value={moduleOneData.guia_aprendizaje || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Recursos Externos */}
            <div className="form-group-phases">
                <label htmlFor="recursos_externos">Recursos Externos</label>
                <input
                    type="text"
                    id="recursos_externos"
                    name="recursos_externos"
                    value={moduleOneData.recursos_externos || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Recursos Propios */}
            <div className="form-group-phases">
                <label htmlFor="recursos_propios">Recursos Propios</label>
                <input
                    type="text"
                    id="recursos_propios"
                    name="recursos_propios"
                    value={moduleOneData.recursos_propios || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Actividades */}
            <div className="form-group-phases">
                <label htmlFor="actividades">Actividades</label>
                <input
                    type="text"
                    id="actividades"
                    name="actividades"
                    value={moduleOneData.actividades || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Rúbricas */}
            <div className="form-group-phases">
                <label htmlFor="rubricas">Rúbricas</label>
                <input
                    type="text"
                    id="rubricas"
                    name="rubricas"
                    value={moduleOneData.rubricas || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Campo: Evaluación */}
            <div className="form-group-phases">
                <label htmlFor="evaluacion">Evaluación</label>
                <input
                    type="text"
                    id="evaluacion"
                    name="evaluacion"
                    value={moduleOneData.evaluacion || ""}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
};

export default FormCreateModuleOne;
