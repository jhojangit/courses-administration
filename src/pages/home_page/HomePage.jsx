import React from 'react'
import Home from '../../components/home/Home'
import FormCreateAdvisor from '../../components/formCreateAdvisor/FormCreateAdvisor'
import FormCreateFaculty from '../../components/formCreateFaculty/FormCreateFaculty'
import FormCreateProgram from '../../components/formCreateProgram/FormCreateProgram'
import FormCreateCourse from '../../components/formCreateCourse/FormCreateCourse'
import FormCreatePhasesPage from '../FormCreatePhases_page/FormCreatePhases_page'
import CourseDetails from '../../components/CourseDetails/CourseDetails'


const HomePage = () => {
  return (
    <div>

        <Home/>
        
        <CourseDetails/>

        <FormCreateAdvisor/>

        <FormCreateFaculty/>

        <FormCreateProgram/>

        <FormCreateCourse/>

        <FormCreatePhasesPage/>




    </div>
  )
}

export default HomePage