import React, { useEffect, useState } from 'react';
import styles from '../../scss/Task.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import paperclip_img from '../../assets/task/mdi_paperclip.svg';
import { useAppDispatch } from '../../hooks/redux';
import {
  changeVisibleSideBar,
  setControlsTaskCurrent,
} from '../../store/reducers/control/controlSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const TableHeaderControls = ({ setIsVisibleSideBar }: any) => {
  const [rows, setRows] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { current_page, all_pages, controls_task_all } = useSelector(
    (state: RootState) => state.control
  );

  useEffect(() => {
    setRows(controls_task_all);
  }, [controls_task_all]);

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
                  Название задачи<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell align="center">
                  Должность<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} style={{ width: '1%' }} align="center">
                  Начало до<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} style={{ width: '1%' }} align="center">
                  Норма<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell className={`table_cell`} align="center">
                  О/А<div className={'border_dashed'}></div>
                </TableCell>
                <TableCell style={{ textAlign: 'center' }} className={`table_cell`} align="right">
                  {rows[0]?.created}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: number) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    onClick={() => {
                      dispatch(changeVisibleSideBar());
                      dispatch(setControlsTaskCurrent({ task_current: row, index: index }));
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
                      dispatch(changeVisibleSideBar());
                      dispatch(setControlsTaskCurrent({ task_current: row, index: index }));
                    }}
                    component="th"
                    scope="row"
                  >
                    {row._task.name}
                    <div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      dispatch(changeVisibleSideBar());
                      dispatch(setControlsTaskCurrent({ task_current: row, index: index }));
                    }}
                    align="center"
                  >
                    {row._task.position}
                    <div className={'border_dashed'}></div>
                  </TableCell>

                  <TableCell
                    onClick={() => {
                      dispatch(changeVisibleSideBar());
                      dispatch(setControlsTaskCurrent({ task_current: row, index: index }));
                    }}
                    style={{ width: '10%', cursor: 'pointer', textAlign: 'center' }}
                    className={styles.paperclip_img}
                    align="left"
                  >
                    {row._task.start_before}
                    <div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      dispatch(changeVisibleSideBar());
                      dispatch(setControlsTaskCurrent({ task_current: row, index: index }));
                    }}
                    style={{ width: '10%', cursor: 'pointer', textAlign: 'center' }}
                    className={styles.paperclip_img}
                    align="left"
                  >
                    {row._task.norm}
                    <div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundImage: `url(${paperclip_img})`,
                      cursor: 'pointer',
                      width: '30px',
                      textAlign: 'center',
                    }}
                    className={styles.paperclip_img}
                    align="right"
                  >
                    <a
                      target={'_blank'}
                      href={row._task.artefact}
                      className={`${styles.table_link}`}
                      rel="noreferrer"
                    ></a>
                    <div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell
                    style={{ cursor: 'pointer' }}
                    className={
                      row.is_approve ? 'bg_light_green' : row.is_reject ? 'bg_light_red' : ''
                    }
                    onClick={() => {
                      dispatch(changeVisibleSideBar());
                      dispatch(setControlsTaskCurrent({ task_current: row, index: index }));
                    }}
                    align="center"
                  >
                    {row.time_spent}
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
