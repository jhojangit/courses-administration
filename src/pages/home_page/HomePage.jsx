import React from 'react'
import Home from '../../components/home/Home'

import CourseDetails from '../../components/CourseDetails/CourseDetails'
import AdvisorDetails from '../../components/advisorDetails/AdvisorDetails'


const HomePage = () => {
  return (
    <div>

        <Home/>
        
        <CourseDetails/>

        <AdvisorDetails/>

    </div>
  )
}

export default HomePage