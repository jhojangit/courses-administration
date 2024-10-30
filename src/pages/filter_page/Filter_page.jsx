import React, { useEffect, useState } from 'react';
import AdvisorDetails from '../../components/advisorDetails/AdvisorDetails';
import FacultyDetails from '../../components/facultyDetails/FacultyDetails';
import ProgramDetails from '../../components/programDetails/ProgramDetails';
import CourseDetails from '../../components/CourseDetails/CourseDetails';
import '../forms/Forms_page.css';
import { supabase } from '../../supabase/supabaseClient';



const FilterPage = () => {
    const [visibleComponent, setVisibleComponent] = useState(null);
    const [counts, setCounts] = useState({
        advisors: 0,
        faculties: 0,
        programs: 0,
        courses: 0
    });

    const toggleComponent = (component) => {
        setVisibleComponent((prev) => (prev === component ? null : component));
    };

    useEffect(() => {
        // Función para obtener el conteo de cada tabla
        const fetchCounts = async () => {
            try {
                const { count: advisorCount } = await supabase.from('advisors').select('*', { count: 'exact', head: true });
                const { count: facultyCount } = await supabase.from('faculties').select('*', { count: 'exact', head: true });
                const { count: programCount } = await supabase.from('programs').select('*', { count: 'exact', head: true });
                const { count: courseCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });

                setCounts({
                    advisors: advisorCount,
                    faculties: facultyCount,
                    programs: programCount,
                    courses: courseCount
                });
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="form-page-container">
            
            <div className="form-page-buttons">
                <button 
                    onClick={() => toggleComponent('advisor')} 
                    className={`form-page-toggle-button ${visibleComponent === 'advisor' ? 'active' : ''}`}
                >
                    Asesor <i class='bx bxs-face bx-md'></i> 
                    <br />
                    {counts.advisors}
                </button>
                <button 
                    onClick={() => toggleComponent('faculty')} 
                    className={`form-page-toggle-button ${visibleComponent === 'faculty' ? 'active' : ''}`}
                >
                    Facultad <i class='bx bxs-buildings bx-md'></i>
                    <br />
                    {counts.faculties}
                </button>
                <button 
                    onClick={() => toggleComponent('program')} 
                    className={`form-page-toggle-button ${visibleComponent === 'program' ? 'active' : ''}`}
                >
                    Programa <i class='bx bx-briefcase bx-md'></i>
                    <br />
                    {counts.programs}
                </button>
                <button 
                    onClick={() => toggleComponent('course')} 
                    className={`form-page-toggle-button ${visibleComponent === 'course' ? 'active' : ''}`}
                >
                    Curso <i class='bx bx-book-bookmark bx-md'></i>
                    <br />
                    {counts.courses}
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
