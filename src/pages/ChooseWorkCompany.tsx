import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/redux';
import styles from '../scss/ChooseWorkCompany.module.scss';
import { RootState } from '../store/store';

export const ChooseWorkCompany = ({ isCollapseSideBar }: any) => {
  // mock data
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.company);

  return (
    <>
      <div className={styles.choose_company}>
        {loading && (
          <LinearProgress
            className={isCollapseSideBar ? 'linear_progress_collapse' : `linear_progress`}
          />
        )}
        <div className={styles.choose_company_wrapper}>
          <div className={styles.choose_company_title}>Компании</div>
        </div>
      </div>
    </>
  );
};
