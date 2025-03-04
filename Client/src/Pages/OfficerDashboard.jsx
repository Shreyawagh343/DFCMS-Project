import ManageCase from '@/Components/ManageCase';
import OfficersCases from '@/Components/OfficersCases';
import React from 'react';


const OfficerDashboard = () => {
    return(
        <>
        <OfficersCases/>
        <ManageCase/>
        </>
    )
}


export default OfficerDashboard;