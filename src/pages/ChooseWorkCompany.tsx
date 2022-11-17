import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { OneCompanyComponent } from '../components/choose_company/OneCompanyComponent';
import { useAppDispatch } from '../hooks/redux';
import styles from '../scss/ChooseWorkCompany.module.scss';
import { RootState } from '../store/store';

export const ChooseWorkCompany = ({ isCollapseSideBar }: any) => {
  // mock data
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.company);
  useEffect(() => {
    // dispatch(getListCompany(''))
  }, []);

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
          {/* {listCompany ? listCompany.map((elem:any) => <OneCompanyComponent key={elem.id} elem={elem}/>)
          : <div className={styles.list_company_empty}>Список компаний пуст</div>} */}
        </div>
      </div>
    </>
  );
};
