import React from 'react';
import Lottie from 'lottie-react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { RootState } from './store/store';
import loadingScreen from './assets/preload.json';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';

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
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/auth'} element={<AuthPage />} />
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
