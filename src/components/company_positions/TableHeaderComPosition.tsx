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
import { getCurrentPositionCompany } from '../../store/reducers/position/positionSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useClickOutSide from '../../hooks/useClickOutSide';

function createData(number: number, name_position: string, employes: string) {
  return { number, name_position, employes };
}

export const TableHeaderComPosition = ({ setIsVisibleSideBar }: any) => {
  const { position_company_current, position_company_all } = useSelector(
    (state: RootState) => state.position
  );
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    setRows(position_company_all);
  }, [position_company_all]);

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
                  Должность<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} align="left">
                  ФИО<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 &&
                rows.map((row: any, index: number) => (
                  <TableRow
                    key={row.number}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          getCurrentPositionCompany({ index: index, current_position_company: row })
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
                      style={{ cursor: 'pointer', width: '50%' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          getCurrentPositionCompany({ index: index, current_position_company: row })
                        );
                      }}
                      component="th"
                      scope="row"
                    >
                      {row?.name}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer', width: '50%' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          getCurrentPositionCompany({ index: index, current_position_company: row })
                        );
                      }}
                      align="left"
                    >
                      {row?.employee?._user?.name}
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
                          getCurrentPositionCompany({ current_position_company: row, index: index })
                        );
                      }}
                      align="center"
                    >
                      <div className={styles.btn_table}></div>
                      {is_delete_btn && position_company_current?.id === row.id && (
                        <div
                          onClick={() => {
                            window.confirm('Вы уверены что хотите удалить пользователя ?') &&
                              alert('удалил');
                          }}
                          ref={delete_btn}
                          className={'delete_btn'}
                        >
                          <span>Удалить</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
