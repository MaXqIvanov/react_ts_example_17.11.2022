import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../../scss/CompanyPosition.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { setCurrentCompany } from '../../store/reducers/company/companySlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import useClickOutSide from '../../hooks/useClickOutSide';
import { deleteCompanyAdmin } from '../../store/reducers/company/ActionCompany';

function createData(number: number, name_company: string, employes: string) {
  return { number, name_company, employes };
}

export const TableHeaderAdmCompany = ({ setIsVisibleSideBar }: any) => {
  const dispatch = useAppDispatch();
  const { company_admin_all, company_admin_current } = useSelector(
    (state: RootState) => state.company
  );
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    setRows(company_admin_all);
  }, [company_admin_all]);
  const [is_delete_btn, setIsDeleteBtn] = useState<boolean>(false);
  const delete_btn = useClickOutSide(() => {
    setIsDeleteBtn(false);
  });

  return (
    <div className={`${styles.table}`}>
      <div className={styles.table_wrapper}>
        <TableContainer component={Paper} className={'custom_table'}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  №<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell>
                  Компания<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} align="left">
                  Администратор<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 ? (
                rows.map((row: typeof rows[0], index: number) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(setCurrentCompany({ company_current: row, index: index }));
                      }}
                      style={{ width: '10px', cursor: 'pointer', maxWidth: '10px' }}
                      component="th"
                      scope="row"
                    >
                      {index + 1}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer', width: '49.5%' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(setCurrentCompany({ company_current: row, index: index }));
                      }}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer', width: '49.5%' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(setCurrentCompany({ company_current: row, index: index }));
                      }}
                      align="left"
                    >
                      {row?.admin?._user?.name}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      className={styles.custom_cell_table}
                      style={{
                        cursor: 'pointer',
                        width: '21px',
                        maxWidth: '21px',
                        minWidth: '21px',
                      }}
                      onClick={() => {
                        setIsDeleteBtn(true);
                        dispatch(setCurrentCompany({ company_current: row, index: index }));
                      }}
                      align="center"
                    >
                      <div className={styles.btn_table}></div>
                      {is_delete_btn && company_admin_current.id === row.id && (
                        <div
                          onClick={() => {
                            window.confirm('Вы уверены что хотите удалить компанию ?') &&
                              dispatch(deleteCompanyAdmin(''));
                          }}
                          ref={delete_btn}
                          className={'delete_btn'}
                        >
                          <span>Удалить</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div></div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
