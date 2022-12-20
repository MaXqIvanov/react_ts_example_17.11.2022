import { LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalWindowAdded } from '../components/admin_company/ModalWindowAdded';
import { NavHeaderAdmCompany } from '../components/admin_company/NavHeaderAdmCompany';
import { ModalWindow } from '../components/admin_company/ModalWindow';
import { TableHeaderAdmCompany } from '../components/admin_company/TableHeaderAdmCompany';
import styles from '../scss/AdminCompany.module.scss';
import { RootState } from '../store/store';

export const AdminCompanyPage = ({ isCollapseSideBar }: any) => {
  const [isvisible_modal, setIsVisibleModalWindow] = useState<boolean>(false);
  const [is_added_modal, setIsModalWindowAdded] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.company);

  return (
    <div className={styles.admin_company}>
      {loading && (
        <LinearProgress
          className={isCollapseSideBar ? 'linear_progress_collapse' : `linear_progress`}
        />
      )}
      <div className={styles.admin_company_wrapper}>
        <NavHeaderAdmCompany setIsModalWindowAdded={setIsModalWindowAdded} />
        <TableHeaderAdmCompany setIsVisibleSideBar={setIsVisibleModalWindow} />
        {isvisible_modal && (
          <ModalWindow
            setIsVisibleModalWindow={setIsVisibleModalWindow}
            isvisible_modal={isvisible_modal}
          />
        )}
        {is_added_modal && (
          <ModalWindowAdded
            setIsModalWindowAdded={setIsModalWindowAdded}
            is_added_modal={is_added_modal}
          />
        )}
      </div>
    </div>
  );
};
