import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../../scss/CompanyEmployes.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { setCurrentEmployesCompany } from '../../store/reducers/employes/employesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useClickOutSide from '../../hooks/useClickOutSide';
import { deleteEmployesCompany } from '../../store/reducers/employes/ActionEmployes';

function createData(number: number, employes: string, name_employ: string) {
  return { number, employes, name_employ };
}

export const TableHeaderComEmployes = ({ setIsVisibleSideBar }: any) => {
  const dispatch = useAppDispatch();
  const { employes_company_all, employes_company_current } = useSelector(
    (state: RootState) => state.employes
  );
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    setRows(employes_company_all);
  }, [employes_company_all]);
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
                <TableCell align="left">
                  Должность<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`}>
                  ФИО<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length ? (
                rows.map((row: any, index: number) => (
                  <TableRow
                    key={row.number}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          setCurrentEmployesCompany({
                            employes_current: row,
                            index: index,
                          })
                        );
                      }}
                      style={{ width: '1%', cursor: 'pointer' }}
                      component="th"
                      scope="row"
                    >
                      {index + 1}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          setCurrentEmployesCompany({
                            employes_current: row,
                            index: index,
                          })
                        );
                      }}
                      component="th"
                      scope="row"
                    >
                      {row._position}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          setCurrentEmployesCompany({
                            employes_current: row,
                            index: index,
                          })
                        );
                      }}
                      align="left"
                    >
                      {row._user.name}
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
                        dispatch(
                          setCurrentEmployesCompany({
                            employes_current: row,
                            index: index,
                          })
                        );
                      }}
                      align="center"
                    >
                      <div className={styles.btn_table}></div>
                      {is_delete_btn && employes_company_current?.id === row.id && (
                        <div
                          onClick={() => {
                            window.confirm('Вы уверены что хотите удалить пользователя ?') &&
                              dispatch(deleteEmployesCompany());
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
