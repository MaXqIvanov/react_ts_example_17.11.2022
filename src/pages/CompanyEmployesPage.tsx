import { LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddedSideBar } from '../components/company_employes/AddedSideBar';
import { NavHeaderComEmployes } from '../components/company_employes/NavHeaderComEmployes';
import { SearchSideBar } from '../components/company_employes/SearchSideBar';
import { SideBar } from '../components/company_employes/SideBar';
import { TableHeaderComEmployes } from '../components/company_employes/TableHeaderComEmployes';
import styles from '../scss/CompanyEmployes.module.scss';
import { RootState } from '../store/store';

export const CompanyEmployesPage = ({ isCollapseSideBar }: any) => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false);
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false);
  const [issearch_sidebar, setIsSearchSideBar] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.employes);

  return (
    <div className={styles.company_employes}>
      {loading && (
        <LinearProgress
          className={isCollapseSideBar ? 'linear_progress_collapse' : `linear_progress`}
        />
      )}
      <div className={styles.company_employes_wrapper}>
        <NavHeaderComEmployes
          setIsAddedSideBar={setIsAddedSideBar}
          setIsSearchSideBar={setIsSearchSideBar}
        />
        <TableHeaderComEmployes setIsVisibleSideBar={setIsVisibleSideBar} />
        {isvisible_sidebaer && (
          <SideBar
            setIsVisibleSideBar={setIsVisibleSideBar}
            isvisible_sidebaer={isvisible_sidebaer}
          />
        )}
        {isadded_sidebar && (
          <AddedSideBar setIsAddedSideBar={setIsAddedSideBar} isadded_sidebar={isadded_sidebar} />
        )}
        {issearch_sidebar && (
          <SearchSideBar
            setIsAddedSideBar={setIsAddedSideBar}
            setIsSearchSideBar={setIsSearchSideBar}
            issearch_sidebar={issearch_sidebar}
          />
        )}
      </div>
    </div>
  );
};
