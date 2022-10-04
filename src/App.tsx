import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
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
import './App.scss';
import { ChooseWorkCompany } from './pages/ChooseWorkCompany';

function App() {
  const { auth, loading } = useSelector((state:RootState)=> state.auth)
  console.log(window.location.href);
  const [isVusubleSideBar, setIsVisibleSideBar] = useState<boolean>(false)
  useEffect(() => {    
    if(window.location.pathname !== '/auth'){
      setIsVisibleSideBar(true)
    }else{
      setIsVisibleSideBar(false)
    }
  }, [])
  
  return (
    <>
    {!loading ? 
      <>
        {auth ?  <Header setIsVisibleSideBar={setIsVisibleSideBar}></Header> : <></> }
        <div className={'wrapper'}>
        {isVusubleSideBar && <SideBar />}
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
            <Route path={'/choose_company'} element={<ChooseWorkCompany />} />
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
