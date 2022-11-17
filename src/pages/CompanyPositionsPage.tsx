import { LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddedSideBar } from '../components/company_positions/AddedSideBar';
import { NavHeaderComPosition } from '../components/company_positions/NavHeaderComPosition';
import { SideBar } from '../components/company_positions/SideBar';
import { TableHeaderComPosition } from '../components/company_positions/TableHeaderComPosition';
import styles from '../scss/CompanyPosition.module.scss';
import { RootState } from '../store/store';

export const CompanyPositionsPage = ({ isCollapseSideBar }: any) => {
  const [isvisible_sidebaer, setIsVisibleSideBar] = useState<boolean>(false);
  const [isadded_sidebar, setIsAddedSideBar] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.position);

  return (
    <div
      style={{
        overflowY: isadded_sidebar ? 'hidden' : 'auto',
        maxHeight: isvisible_sidebaer || isadded_sidebar ? 'calc(100vh - 60px)' : 'none',
      }}
      className={styles.company_employes}
    >
      {loading && (
        <LinearProgress
          className={isCollapseSideBar ? 'linear_progress_collapse' : `linear_progress`}
        />
      )}
      <div className={styles.company_employes_wrapper}>
        <NavHeaderComPosition setIsAddedSideBar={setIsAddedSideBar} />
        <TableHeaderComPosition setIsVisibleSideBar={setIsVisibleSideBar} />
        {isvisible_sidebaer && (
          <SideBar
            setIsVisibleSideBar={setIsVisibleSideBar}
            isvisible_sidebaer={isvisible_sidebaer}
          />
        )}
        {isadded_sidebar && (
          <AddedSideBar setIsAddedSideBar={setIsAddedSideBar} isadded_sidebar={isadded_sidebar} />
        )}
      </div>
    </div>
  );
};
