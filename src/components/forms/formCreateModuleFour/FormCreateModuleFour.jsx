import React from 'react';



const FormCreateModuleFour = ({ moduleFourData, onModuleFourChange }) => {

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        onModuleFourChange(name, value);  
    };

    return (
        <form className="form">
            <h3>Crear Módulo Cuatro</h3>

            {/* Campo: Guía de Aprendizaje */}
            <div className="form-group">
                <label htmlFor="guia_aprendizaje">Guía de Aprendizaje</label>
                <input
                    type="text"
                    id="guia_aprendizaje"
                    name="guia_aprendizaje"
                    value={moduleFourData.guia_aprendizaje  || ""}
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
                    value={moduleFourData.recursos_externos  || ""}
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
                    value={moduleFourData.recursos_propios  || ""}
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
                    value={moduleFourData.actividades  || ""}
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
                    value={moduleFourData.rubricas  || ""}
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
                    value={moduleFourData.evaluacion  || ""}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
};

export default FormCreateModuleFour;
