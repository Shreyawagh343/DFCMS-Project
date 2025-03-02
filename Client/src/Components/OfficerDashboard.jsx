// src/pages/OfficerDashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';

const OfficerDashboard = () => {
    const { officerCode } = useParams(); // Extract officerCode from the URL

    return (
        <div>
            <h1>Welcome to Officer {officerCode}'s Dashboard</h1>
            <p>This is your personalized dashboard.</p>
        </div>
    );
};

export default OfficerDashboard;