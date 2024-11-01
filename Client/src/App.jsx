import { Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Sign from './Components/Sign';
import Login from './Components/Login';
import DashbaordOffB from './Components/DashbaordOffB';
import DashboardOffC from './Components/DashboardOffC';
import DashboardA from './Pages/DashboardA';
import ManageCasePage from './Pages/ManageCasePage';



function App() {
 return (
    <>
     <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Sign/>}/>
      <Route path="/dashboard/Office12" element={<DashbaordOffB/>} />
      <Route path="/dashboard/Office13" element={<DashboardA/>} />
      <Route path="/dashboard/Office14" element={<DashboardOffC/>} />
      <Route path="/dashboard/ManageCase" element={<ManageCasePage/>} />
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App
