import React from 'react'
import Home from '../../components/home/Home'

import CourseDetails from '../../components/CourseDetails/CourseDetails'
import AdvisorDetails from '../../components/advisorDetails/AdvisorDetails'
import FormCreatePhasesPage from '../FormCreatePhases_page/FormCreatePhases_page'
import FormCreateCourse from '../../components/forms/formCreateCourse/FormCreateCourse'
import FormCreateAdvisor from '../../components/forms/formCreateAdvisor/FormCreateAdvisor'
import FormCreateFaculty from '../../components/forms/formCreateFaculty/FormCreateFaculty'
import FormCreateProgram from '../../components/forms/formCreateProgram/FormCreateProgram'


const HomePage = () => {
  return (
    <div>

        <Home/>
        
        <CourseDetails/> 

        {/* <AdvisorDetails/> */}




{/* 
        <FormCreateAdvisor/>

        <FormCreateFaculty/>

        <FormCreateProgram/>

        <FormCreateCourse/>


        <FormCreatePhasesPage/> 
*/}

    </div>
  )
}

export default HomePage