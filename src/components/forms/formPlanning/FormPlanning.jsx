const FormPlanning = ({ planningData, onPlanningChange }) => {
    const handleChange = (e) => {
        const { name, checked } = e.target;
        // Invierte el estado del checkbox en `planningData`
        onPlanningChange(name, checked);  
    };

    return (
        <form className="form-phases">
            <h3>PLANEACIÓN</h3>
            <div className="form-group-phases">
                <label htmlFor="acta_de_inicio">Acta de Inicio</label>
                <input
                    type="checkbox"
                    id="acta_de_inicio"
                    name="acta_de_inicio"
                    checked={planningData.acta_de_inicio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="matriz_de_coherencia">Matriz de Coherencia</label>
                <input
                    type="checkbox"
                    id="matriz_de_coherencia"
                    name="matriz_de_coherencia"
                    checked={planningData.matriz_de_coherencia}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="diseño_instruccional">Diseño Instruccional</label>
                <input
                    type="checkbox"
                    id="diseño_instruccional"
                    name="diseño_instruccional"
                    checked={planningData.diseño_instruccional}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
};

export default FormPlanning;
