import React, { useEffect, useState } from 'react';
import styles from '../../scss/Employes.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch } from '../../hooks/redux';
import { setCurrentEmployes } from '../../store/reducers/employes/employesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function createData(number: number, position: string, employes: string) {
  return { number, position, employes };
}

const rows = [
  createData(1, 'Frozen yoghurt', 'Менеджер отдела продаж'),
  createData(2, 'Ice cream sandwich', 'Менеджер отдела продаж'),
  createData(3, 'Eclair', 'Менеджер отдела продаж'),
  createData(4, 'Cupcake', 'Менеджер отдела продаж'),
  createData(5, 'Gingerbread', 'Менеджер отдела продаж'),
];

export const TableHeaderEmployes = ({ setIsVisibleSideBar }: any) => {
  const dispatch = useAppDispatch();
  const { employes_all } = useSelector((state: RootState) => state.employes);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    setRows(employes_all);
  }, [employes_all]);

  return (
    <div className={`${styles.table}`}>
      <div className={styles.table_wrapper}>
        <TableContainer component={Paper} className="custom_table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  №<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell>
                  ФИО<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} align="left">
                  Должность<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 &&
                rows.map((row: any, index: number) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          setCurrentEmployes({
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
                          setCurrentEmployes({
                            employes_current: row,
                            index: index,
                          })
                        );
                      }}
                      component="th"
                      scope="row"
                    >
                      {row?._user?.name}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          setCurrentEmployes({
                            employes_current: row,
                            index: index,
                          })
                        );
                      }}
                      align="left"
                    >
                      {row?._position}
                      <div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      className={styles.custom_cell_table}
                      style={{ cursor: 'pointer', width: '30px', maxWidth: '30px' }}
                      onClick={() => {
                        setIsVisibleSideBar(true);
                        dispatch(
                          setCurrentEmployes({
                            employes_current: row,
                            index: index,
                          })
                        );
                      }}
                      align="center"
                    >
                      <div className={styles.btn_table}></div>
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
