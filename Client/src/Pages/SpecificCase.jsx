import ShowDetails from '@/Components/ShowDetails'
import React from 'react'

import OfficersCases from '@/Components/OfficersCases'
import EditCase from '@/Components/EditCases'
import DeleteCase from '@/Components/DeleteCase'

const SpecificCase = () => {
  return (
    <div className='mb-[10rem]'>
    <OfficersCases/>
    <ShowDetails/> 
    <div className="">
    <EditCase /> 
    <DeleteCase/>
    </div>
    </div>
  )
}

export default SpecificCase