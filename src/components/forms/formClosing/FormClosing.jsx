

const FormClosing = ({ closingData, onClosingChange }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onClosingChange(name, value);  
    };

    return (
        <form className="form">
            <h3>Crear Cierre</h3>
            

            <div className="form-group">
                <label htmlFor="actividades_cierre">Actividades de cierre</label>
                <input
                    type="text"
                    id="actividades_cierre"
                    name="actividades_cierre"
                    value={closingData.actividades_cierre  || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="evaluacion_percepcion">Evaluación de percepción</label>
                <input
                    type="text"
                    id="evaluacion_percepcion"
                    name="evaluacion_percepcion"
                    value={closingData.evaluacion_percepcion  || ""}
                    onChange={handleChange}
                    required
                />
            </div>

        </form>
    );
};




export default FormClosing;
