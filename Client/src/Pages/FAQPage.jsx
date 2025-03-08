import FAQquestions from '@/Components/FAQquestions'
import OfficersCases from '@/Components/OfficersCases'
import SideDrawer from '@/Components/SideDrawer'
import React from 'react'

const FAQPage = () => {
  return (
    <div>
        <OfficersCases/>
        <SideDrawer/>
        <FAQquestions/>
    </div>
  )
}

export default FAQPage