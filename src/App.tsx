import React from 'react';
import Lottie from 'lottie-react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { RootState } from './store/store';
import loadingScreen from './assets/preload.json';
import { AuthPage } from './pages/AuthPage';
import { TasksPage } from './pages/TasksPage';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { ControlsPage } from './pages/ControlsPage';
import { EmployesPage } from './pages/EmployesPage';
import { CompanyEmployesPage } from './pages/CompanyEmployesPage';
import { CompanyPositionsPage } from './pages/CompanyPositionsPage';
import { AdminCompanyPage } from './pages/AdminCompanyPage';
import { AdminEmployesPage } from './pages/AdminEmployesPage';

function App() {
  const { auth, loading } = useSelector((state:RootState)=> state.auth)
  console.log(window.location.href);
  
  return (
    <>
    {!loading ? 
      <>
        {auth ?  <Header></Header> : <></> }
        <div className={'wrapper'}>
        {window.location.pathname !== '/auth' && <SideBar />}
        <Routes>
           { auth ? 
           <>
            <Route path={'/auth'} element={<AuthPage />} />
            {/* tasks */}
            <Route path={'/'} element={<TasksPage />} />
             {/* end tasks */}
            <Route path={'/controls'} element={<ControlsPage />} />
            <Route path={'/employes'} element={<EmployesPage />} />
            <Route path={'/company_employes'} element={<CompanyEmployesPage />} />
            <Route path={'/company_positions'} element={<CompanyPositionsPage />} />
            <Route path={'/admin_companies'} element={<AdminCompanyPage />} />
            <Route path={'/admin_employes'} element={<AdminEmployesPage />} />
           </>
           :
           <Route path={'/auth'} element={<AuthPage />} />
          } 
        </Routes>
        </div>
      </>  
      : <div className='loading'><Lottie className='spinner_app' animationData={loadingScreen} /></div>}
    </>    
  );
}

export default App;
