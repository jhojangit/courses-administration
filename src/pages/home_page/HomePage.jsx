import React from 'react'
import Home from '../../components/home/Home'

import CourseDetails from '../../components/CourseDetails/CourseDetails'
import AdvisorDetails from '../../components/advisorDetails/AdvisorDetails'
import FacultyDetails from '../../components/facultyDetails/FacultyDetails'
import ProgramDetails from '../../components/programDetails/ProgramDetails'
import AsideMenu from '../../components/asideMenu/AsideMenu'


const HomePage = () => {
  return (
    <div>

        <Home/>

        <AsideMenu/>


        <AdvisorDetails/>
        
        <FacultyDetails/>

        <ProgramDetails/>

        <CourseDetails/>  






    </div>
  )
}

export default HomePage