const FormPlanning = ({ planningData, onPlanningChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onPlanningChange(name, value);  
    };

    return (
        <form className="form-phases">
            <h3>PLANEACIÓN</h3>
            <div className="form-group-phases">
                <label htmlFor="acta_de_inicio">Acta de Inicio</label>
                <input
                    type="text"
                    id="acta_de_inicio"
                    name="acta_de_inicio"
                    value={planningData.acta_de_inicio || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="matriz_de_coherencia">Matriz de Coherencia</label>
                <input
                    type="text"
                    id="matriz_de_coherencia"
                    name="matriz_de_coherencia"
                    value={planningData.matriz_de_coherencia || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="diseño_instruccional">Diseño Instruccional</label>
                <input
                    type="text"
                    id="diseño_instruccional"
                    name="diseño_instruccional"
                    value={planningData.diseño_instruccional || ''}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
};

export default FormPlanning;
