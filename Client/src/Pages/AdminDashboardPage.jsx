import AdminDashboard from '@/Components/AdminDashboard';
import AdminmanageCase from '@/Components/AdminmanageCase';
import AdminNavbar from '@/Components/AdminNavbar';
import AdminPieChart from '@/Components/AdminPieChart';
import PieChat from '@/Components/PieChat';
import TimeLine from '@/Components/TimeLine';
 import React from 'react';

const AdminDashboardPage = () => {
    

    return (
        <div>
            <AdminNavbar/>
            <AdminDashboard/>
            <div className="flex">
        <PieChat/>
        <AdminPieChart/>
        </div>
            <AdminmanageCase/>
        </div>
    );
};

export default AdminDashboardPage;