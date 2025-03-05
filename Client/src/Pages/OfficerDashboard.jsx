import CaseStatistics from '@/Components/CaseStatistics';
import ManageCase from '@/Components/ManageCase';
import OfficersCases from '@/Components/OfficersCases';
import PieChat from '@/Components/PieChat';
import TimeLine from '@/Components/TimeLine';
import React from 'react';


const OfficerDashboard = () => {
    return(
        <>
        <div className="mb-[16rem]">
        <OfficersCases/>
        <CaseStatistics/>
        <div className="flex">
        <PieChat/>
        <TimeLine/>
        </div>
        <ManageCase/>
        </div>
        
        </>
    )
}


export default OfficerDashboard;