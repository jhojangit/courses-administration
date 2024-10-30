import React, { useState } from 'react';
import AdvisorDetails from '../../components/advisorDetails/AdvisorDetails';
import FacultyDetails from '../../components/facultyDetails/FacultyDetails';
import ProgramDetails from '../../components/programDetails/ProgramDetails';
import CourseDetails from '../../components/CourseDetails/CourseDetails';
import '../forms/Forms_page.css';



const FilterPage = () => {
    const [visibleComponent, setVisibleComponent] = useState(null);

    const toggleComponent = (component) => {
        setVisibleComponent((prev) => (prev === component ? null : component));
    };

    return (
        <div className="form-page-container">
            
            <div className="form-page-buttons">
                <button 
                    onClick={() => toggleComponent('advisor')} 
                    className={`form-page-toggle-button ${visibleComponent === 'advisor' ? 'active' : ''}`}
                >
                    Asesor
                </button>
                <button 
                    onClick={() => toggleComponent('faculty')} 
                    className={`form-page-toggle-button ${visibleComponent === 'faculty' ? 'active' : ''}`}
                >
                    Facultad
                </button>
                <button 
                    onClick={() => toggleComponent('program')} 
                    className={`form-page-toggle-button ${visibleComponent === 'program' ? 'active' : ''}`}
                >
                    Programa
                </button>
                <button 
                    onClick={() => toggleComponent('course')} 
                    className={`form-page-toggle-button ${visibleComponent === 'course' ? 'active' : ''}`}
                >
                    Curso
                </button>
            </div>

            <div className="form-container-options">
                {visibleComponent === 'advisor' && <AdvisorDetails />}
                {visibleComponent === 'faculty' && <FacultyDetails />}
                {visibleComponent === 'program' && <ProgramDetails />}
                {visibleComponent === 'course' && <CourseDetails />}
            </div>
        </div>
    );
};

export default FilterPage;
