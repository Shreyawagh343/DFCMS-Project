import { Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Sign from './Components/Sign';
import ManageCasePage from './Pages/ManageCasePage';
import AddCasePage from './Pages/AddCasePage';
import AdminDashboard from "./Components/AdminDashboard";
import LoginPage from './Pages/LoginPage';
import { Navigate } from 'react-router-dom';
import OfficerDashboard from './Pages/OfficerDashboard';



function App() {
  const isAuthenticated = !!localStorage.getItem('token');
 return (
    <>
     <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Profile/>}/>
      <Route path='/loginhome' element={<LoginPage/>}/>
      <Route path='/signin' element={<Sign/>}/>
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
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <AdminDashboard/>
                        ) : (
                            <Navigate to="/loginhome" />
                        )
                    }
                />
      <Route path="/dashboard/ManageCase" element={<ManageCasePage/>} />
      <Route path="/AddCase" element={<AddCasePage/>} />
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App
