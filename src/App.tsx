import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { useAppDispatch } from './hooks/redux';
import { getProfile } from './store/authSlice';

function App() {
  const { auth, loading, current_company, user } = useSelector((state: RootState) => state.auth);
  console.log(window.location.href);
  const [isVusubleSideBar, setIsVisibleSideBar] = useState<boolean>(false);
  const [isCollapseSideBar, setIsCollapseSideBar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(getProfile({ nav: nav }));
  }, [current_company?.id, auth]);

  useEffect(() => {
    if (auth === true) {
      setIsVisibleSideBar(true);
    } else {
      setIsVisibleSideBar(false);
    }
  }, [auth]);

  return (
    <>
      {!loading ? (
        <>
          {auth ? (
            <Header
              setIsCollapseSideBar={setIsCollapseSideBar}
              isCollapseSideBar={isCollapseSideBar}
              isVusubleSideBar={isVusubleSideBar}
              setIsVisibleSideBar={setIsVisibleSideBar}
            ></Header>
          ) : (
            <></>
          )}
          <div className={'wrapper'}>
            {isVusubleSideBar === true && <SideBar isCollapseSideBar={isCollapseSideBar} />}
            <Routes>
              {auth ? (
                <>
                  <Route
                    path={'/auth'}
                    element={<AuthPage setIsVisibleSideBar={setIsVisibleSideBar} />}
                  />
                  {/* tasks */}
                  {(user.is_staff || user.is_executor) && (
                    <Route
                      path={'/'}
                      element={<TasksPage isCollapseSideBar={isCollapseSideBar} />}
                    />
                  )}
                  {/* end tasks */}
                  {(user.is_staff || user.is_controller) && (
                    <Route
                      path={'/controls'}
                      element={<ControlsPage isCollapseSideBar={isCollapseSideBar} />}
                    />
                  )}
                  {(user.is_staff || user.is_analyst) && (
                    <Route
                      path={'/employes'}
                      element={<EmployesPage isCollapseSideBar={isCollapseSideBar} />}
                    />
                  )}
                  {(user.is_admin || user.is_staff) && (
                    <Route
                      path={'/company_employes'}
                      element={<CompanyEmployesPage isCollapseSideBar={isCollapseSideBar} />}
                    />
                  )}
                  {(user.is_admin || user.is_staff) && (
                    <Route
                      path={'/company_positions'}
                      element={<CompanyPositionsPage isCollapseSideBar={isCollapseSideBar} />}
                    />
                  )}
                  {user.is_staff && (
                    <Route
                      path={'/admin_companies'}
                      element={<AdminCompanyPage isCollapseSideBar={isCollapseSideBar} />}
                    />
                  )}
                  {user.is_staff && (
                    <Route
                      path={'/admin_employes'}
                      element={<AdminEmployesPage isCollapseSideBar={isCollapseSideBar} />}
                    />
                  )}
                  <Route path={'/choose_company'} element={<ChooseWorkCompany />} />
                </>
              ) : (
                <Route
                  path={'/auth'}
                  element={<AuthPage setIsVisibleSideBar={setIsVisibleSideBar} />}
                />
              )}
            </Routes>
          </div>
        </>
      ) : (
        <div className="loading">
          <Lottie className="spinner_app" animationData={loadingScreen} />
        </div>
      )}
    </>
  );
}

export default App;
