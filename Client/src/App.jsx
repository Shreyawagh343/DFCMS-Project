import { Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Sign from './Components/Sign';
import ManageCasePage from './Pages/ManageCasePage';
import AddCasePage from './Pages/AddCasePage';
import LoginPage from './Pages/LoginPage';
import { Navigate } from 'react-router-dom';
import OfficerDashboard from './Pages/OfficerDashboard';
import EditCase from './Components/EditCases';
import SpecificCase from './Pages/SpecificCase';
import Contpage from './Pages/ContPage';
import FAQPage from './Pages/FAQPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';
import AdminFAQpage from './Pages/AdminFAQpage';





function App() {
  const isAuthenticated = !!localStorage.getItem('token');
 return (
    <>
     <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/loginhome' element={<LoginPage/>}/>
      <Route path='/signin' element={<Sign/>}/>
      <Route path='/:officerCode/Contact' element={<Contpage/>}/>
      <Route
                    path="/officer/:officerCode/dashboard"
                    element={
                        isAuthenticated ? (
                            <OfficerDashboard/>
                        ) : (
                            <Navigate to="/loginhome" />
                        )
                    }
                />
      <Route
                    path="/case/:caseId/dashboard"
                    element={
                        isAuthenticated ? (
                           <SpecificCase/>
                        ) : (
                            <Navigate to="/officer/:officerCode/dashboard" />
                        )
                    }
                />
      <Route
                    path="/case/:caseId/dashboard"
                    element={
                        isAuthenticated ? (
                            <EditCase/>
                        ) : (
                            <Navigate to="/officer/:officerCode/dashboard" />
                        )
                    }
                />
      <Route
                    path="/admin/dashboard"
                    element={
                        isAuthenticated ? (
                            <AdminDashboardPage/>
                        ) : (
                            <Navigate to="/loginhome" />
                        )
                    }
                />
      <Route path="/dashboard/ManageCase" element={<ManageCasePage/>} />
      <Route path="/AddCase" element={<AddCasePage/>} />
      <Route path="/FaqQuestions" element={<FAQPage/>} />
      <Route path="/AdminFaqQuestions" element={<AdminFAQpage/>} />
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App
