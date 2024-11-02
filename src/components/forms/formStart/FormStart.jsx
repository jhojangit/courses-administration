import React from 'react';
import './FormStart.css';

const FormStart = ({ startData, onStartChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onStartChange(name, value);
    };

    return (
        <form className="form-phases">
            <h3>SECCIÓN DE INICIO</h3>

            <div className="form-group-phases">
                <label htmlFor="banner">Banner</label>
                <input
                    type="text"
                    id="banner"
                    name="banner"
                    value={startData.banner}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="caratulas">Carátulas</label>
                <input
                    type="text"
                    id="caratulas"
                    name="caratulas"
                    value={startData.caratulas}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="presentacion_docente">Presentación Docente</label>
                <input
                    type="text"
                    id="presentacion_docente"
                    name="presentacion_docente"
                    value={startData.presentacion_docente}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="presentacion_curso">Presentación Curso</label>
                <input
                    type="text"
                    id="presentacion_curso"
                    name="presentacion_curso"
                    value={startData.presentacion_curso}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="acuerdos">Acuerdos</label>
                <input
                    type="text"
                    id="acuerdos"
                    name="acuerdos"
                    value={startData.acuerdos}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="cronograma">Cronograma</label>
                <input
                    type="text"
                    id="cronograma"
                    name="cronograma"
                    value={startData.cronograma}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="normas_citacion">Normas de Citación</label>
                <input
                    type="text"
                    id="normas_citacion"
                    name="normas_citacion"
                    value={startData.normas_citacion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="diagnostico">Diagnóstico</label>
                <input
                    type="text"
                    id="diagnostico"
                    name="diagnostico"
                    value={startData.diagnostico}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="en_aula">En Aula</label>
                <input
                    type="text"
                    id="en_aula"
                    name="en_aula"
                    value={startData.en_aula}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group-phases">
                <label htmlFor="url_aula">URL Aula</label>
                <input
                    type="text"
                    id="url_aula"
                    name="url_aula"
                    value={startData.url_aula}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
};

export default FormStart;
