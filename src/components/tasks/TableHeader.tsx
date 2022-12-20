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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/reducers/tasks/taskSlice';
import { changeVisibleSideBarCreate } from '../../store/reducers/employes/employesSlice';
import moment from 'moment';
import 'moment/locale/ru';
import { getCurrentTask } from '../../store/reducers/tasks/ActionSlice';

function createData(
  number: number,
  name_task: string,
  begining: number,
  OA: any,
  carbs: number,
  monday: number,
  thuesday: number,
  thirtday: number,
  firstday: number,
  friday: number,
  saturday: number,
  sunday: number,
  stat: number
) {
  return {
    number,
    name_task,
    begining,
    OA,
    carbs,
    monday,
    thuesday,
    thirtday,
    firstday,
    friday,
    saturday,
    sunday,
    stat,
  };
}

export const TableHeader = ({ visible, current_day_task }: any) => {
  const { current_variant_table, get_all_task_week } = useSelector(
    (state: RootState) => state.task
  );

  const dispatch = useAppDispatch();
  const [isVisibleHref, setIsVisibleHref] = useState<any>(null);
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    setRows(get_all_task_week);
  }, [get_all_task_week]);

  const countSumHours = ({ day }: any) => {
    return (rows.reduce((old: any, new_value: any) => new_value.norm + old, 0) / 60).toFixed(1);
  };

  return (
    <div
      onClick={() => isVisibleHref !== null && setIsVisibleHref(null)}
      className={`${styles.table} custom_table_task`}
    >
      <div className={styles.table_wrapper}>
        <TableContainer component={Paper} className={visible ? 'custom_table_emp' : 'custom_table'}>
          {current_variant_table === 1 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ borderLeft: '0px' }}>
                    №<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell>
                    Название задачи<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell align="center">
                    Начало до<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell align="center">
                    Норма<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell className={`table_cell`} align="center">
                    О/А
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length > 0 &&
                  rows.map((row: any, index: number) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
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
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        style={{ cursor: 'pointer' }}
                        component="th"
                        scope="row"
                      >
                        {row.name}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        style={{ cursor: 'pointer', width: '95px', maxWidth: '95px' }}
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        align="center"
                      >
                        {row.start_before}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        style={{ cursor: 'pointer', width: '75px', maxWidth: '75px' }}
                        align="center"
                      >
                        {row.norm}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        onClick={() => setIsVisibleHref(row.id)}
                        style={{
                          backgroundImage: `url(${paperclip_img})`,
                          width: '30px',
                          cursor: 'pointer',
                        }}
                        className={styles.paperclip_img}
                        align="right"
                      >
                        <a
                          target={'_blank'}
                          href={row.artefact}
                          className={`${styles.table_link}`}
                          rel="noreferrer"
                        ></a>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          {current_variant_table === 2 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                {rows[0]?.days?.length > 0 ? (
                  <TableRow>
                    <TableCell>
                      №<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell>
                      Название задачи<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      Начало до<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      Норма<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      О/А<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          moment().date() === rows[0]?.days[0]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[0]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      align="center"
                    >
                      {rows[0]?.days[0]?.weekday}, {rows[0]?.days[0]?.day} {rows[0]?.days[0]?.month}
                      <div className={'border_dashed'}></div>
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          moment().date() === rows[0]?.days[1]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[1]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      align="center"
                    >
                      {rows[0]?.days[1]?.weekday}, {rows[0]?.days[1]?.day} {rows[0]?.days[1]?.month}
                      <div className={'border_dashed'}></div>
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          moment().date() === rows[0]?.days[2]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[2]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      align="center"
                    >
                      {rows[0]?.days[2]?.weekday}, {rows[0]?.days[2]?.day} {rows[0]?.days[2]?.month}
                      <div className={'border_dashed'}></div>
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          moment().date() === rows[0]?.days[3]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[3]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      align="center"
                    >
                      {rows[0]?.days[3]?.weekday}, {rows[0]?.days[3]?.day} {rows[0]?.days[3]?.month}
                      <div className={'border_dashed'}></div>
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          moment().date() === rows[0]?.days[4]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[4]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      align="center"
                    >
                      {rows[0]?.days[4]?.weekday}, {rows[0]?.days[4]?.day} {rows[0]?.days[4]?.month}
                      <div className={'border_dashed'}></div>
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          moment().date() === rows[0]?.days[5]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[5]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      align="center"
                    >
                      {rows[0]?.days[5]?.weekday}, {rows[0]?.days[5]?.day} {rows[0]?.days[5]?.month}
                      <div className={'border_dashed'}></div>
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                    <TableCell
                      style={{
                        color:
                          moment().date() === rows[0]?.days[6]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[6]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      className={`table_cell ${styles.table_cell}`}
                      align="center"
                    >
                      {rows[0]?.days[6]?.weekday}, {rows[0]?.days[6]?.day} {rows[0]?.days[6]?.month}
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>
                      №<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell>
                      Название задачи<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      Начало до<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      Норма<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      О/А<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      ...<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      ...<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      ...<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      ...<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      ...<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell align="center">
                      ...<div className={'border_dashed'}></div>
                    </TableCell>
                    <TableCell className={`table_cell ${styles.table_cell}`} align="center">
                      ...
                    </TableCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {rows?.length > 0 &&
                  rows?.map((row: any, index: number) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
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
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        style={{ cursor: 'pointer' }}
                        component="th"
                        scope="row"
                      >
                        {row.name}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        style={{
                          cursor: 'pointer',
                          textAlign: 'center',
                          width: '95px',
                          maxWidth: '95px',
                        }}
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        align="right"
                      >
                        {row.start_before}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        style={{
                          cursor: 'pointer',
                          textAlign: 'center',
                          width: '75px',
                          maxWidth: '75px',
                        }}
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        align="right"
                      >
                        {row.norm}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        onClick={() => setIsVisibleHref(row.id)}
                        style={{
                          backgroundImage: `url(${paperclip_img})`,
                          cursor: 'pointer',
                          width: '29px',
                        }}
                        className={styles.paperclip_img}
                        align="right"
                      >
                        <a
                          target={'_blank'}
                          href={row.artefact}
                          className={`${styles.table_link}`}
                          rel="noreferrer"
                        ></a>
                        {/* {isVisibleHref === row?.id &&
                            <div className={styles.href_link}>
                                <a href='https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0'>
                                    https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0
                                </a>
                            </div> } */}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      {row?.days?.length > 0 ? (
                        <>
                          <TableCell
                            className={`${
                              row?.days[0]?.status === 'red'
                                ? 'bg_light_red'
                                : row?.days[0]?.status === 'green'
                                ? 'bg_light_green'
                                : row.days[0]?.status === 'yellow'
                                ? 'bg_light_yellow'
                                : 'bg_white'
                            } `}
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() => {
                              dispatch(getCurrentTask({ current_task: row, index: index }));
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              );
                            }}
                            align="right"
                          >
                            {row?.days[0]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            className={`${
                              row.days[1]?.status === 'red'
                                ? 'bg_light_red'
                                : row.days[1]?.status === 'green'
                                ? 'bg_light_green'
                                : row.days[1]?.status === 'yellow'
                                ? 'bg_light_yellow'
                                : 'bg_white'
                            } `}
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() => {
                              dispatch(getCurrentTask({ current_task: row, index: index }));
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              );
                            }}
                            align="right"
                          >
                            {row?.days[1]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            className={`${
                              row.days[2]?.status === 'red'
                                ? 'bg_light_red'
                                : row.days[2]?.status === 'green'
                                ? 'bg_light_green'
                                : row.days[2]?.status === 'yellow'
                                ? 'bg_light_yellow'
                                : 'bg_white'
                            } `}
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() => {
                              dispatch(getCurrentTask({ current_task: row, index: index }));
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              );
                            }}
                            align="right"
                          >
                            {row?.days[2]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            className={`${
                              row.days[3]?.status === 'red'
                                ? 'bg_light_red'
                                : row.days[3]?.status === 'green'
                                ? 'bg_light_green'
                                : row.days[3]?.status === 'yellow'
                                ? 'bg_light_yellow'
                                : 'bg_white'
                            } `}
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() => {
                              dispatch(getCurrentTask({ current_task: row, index: index }));
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              );
                            }}
                            align="right"
                          >
                            {row?.days[3]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            className={`${
                              row.days[4]?.status === 'red'
                                ? 'bg_light_red'
                                : row.days[4]?.status === 'green'
                                ? 'bg_light_green'
                                : row.days[4]?.status === 'yellow'
                                ? 'bg_light_yellow'
                                : 'bg_white'
                            } `}
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() => {
                              dispatch(getCurrentTask({ current_task: row, index: index }));
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              );
                            }}
                            align="right"
                          >
                            {row?.days[4]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            className={`${
                              row.days[5]?.status === 'red'
                                ? 'bg_light_red'
                                : row.days[5]?.status === 'green'
                                ? 'bg_light_green'
                                : row.days[5]?.status === 'yellow'
                                ? 'bg_light_yellow'
                                : 'bg_white'
                            } `}
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() => {
                              dispatch(getCurrentTask({ current_task: row, index: index }));
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              );
                            }}
                            align="right"
                          >
                            {row?.days[5]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            className={`${
                              row.days[6]?.status === 'red'
                                ? 'bg_light_red'
                                : row.days[6]?.status === 'green'
                                ? 'bg_light_green'
                                : row.days[6]?.status === 'yellow'
                                ? 'bg_light_yellow'
                                : 'bg_white'
                            } `}
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() => {
                              dispatch(getCurrentTask({ current_task: row, index: index }));
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              );
                            }}
                            align="right"
                          >
                            {row?.days[6]?.do === true ? row?.norm : ''}
                            {/* <div className={'border_dashed'}></div> */}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() =>
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              )
                            }
                            align="right"
                          >
                            ...
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() =>
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              )
                            }
                            align="right"
                          >
                            ...
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() =>
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              )
                            }
                            align="right"
                          >
                            ...
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() =>
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              )
                            }
                            align="right"
                          >
                            ...
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() =>
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              )
                            }
                            align="right"
                          >
                            ...
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() =>
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              )
                            }
                            align="right"
                          >
                            ...
                            <div className={'border_dashed'}></div>
                          </TableCell>
                          <TableCell
                            style={{
                              cursor: 'pointer',
                              textAlign: 'center',
                              width: '86px',
                              maxWidth: '86px',
                            }}
                            onClick={() =>
                              dispatch(
                                !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                              )
                            }
                            align="right"
                          >
                            ...
                            {/* <div className={'border_dashed'}></div> */}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          {current_variant_table === 3 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    №<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell>
                    Название задачи<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }} align="right">
                    Начало до<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }} align="right">
                    Норма<div className={'border_dashed'}></div>
                  </TableCell>
                  <TableCell
                    style={{ minWidth: '20px', textAlign: 'center' }}
                    className={`header_oa`}
                    align="right"
                  >
                    О/А<div className={'border_dashed'}></div>
                  </TableCell>
                  {rows[0]?.days?.length > 0 ? (
                    <TableCell
                      style={{
                        textAlign: 'center',
                        color:
                          moment().date() === rows[0]?.days[0]?.day &&
                          moment().locale('ru').format('MMMM').includes(rows[0]?.days[0]?.month)
                            ? '#03A9F4'
                            : '#3C3C3C',
                      }}
                      className={`table_cell`}
                      align="right"
                    >
                      {rows[0]?.days[0]?.weekday}, {rows[0]?.days[0]?.day} {rows[0]?.days[0]?.month}
                      <br></br>
                      {countSumHours({ day: 0 })}
                    </TableCell>
                  ) : (
                    <TableCell
                      style={{ textAlign: 'center' }}
                      className={`table_cell`}
                      align="right"
                    >
                      ...
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length > 0 &&
                  rows.map((row: any, index: number) => (
                    <TableRow
                      key={row.id}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                    >
                      <TableCell
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
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
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        style={{ cursor: 'pointer' }}
                        component="th"
                        scope="row"
                      >
                        {row.name}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        style={{
                          cursor: 'pointer',
                          textAlign: 'center',
                          width: '95px',
                          maxWidth: '95px',
                        }}
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        align="right"
                      >
                        {row.start_before}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        style={{
                          cursor: 'pointer',
                          textAlign: 'center',
                          width: '75px',
                          maxWidth: '75px',
                        }}
                        onClick={() => {
                          dispatch(getCurrentTask({ current_task: row, index: index }));
                          dispatch(
                            !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                          );
                        }}
                        align="right"
                      >
                        {row.norm}
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      <TableCell
                        onClick={() => setIsVisibleHref(row.number)}
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
                          href={row.artefact}
                          className={`${styles.table_link}`}
                          rel="noreferrer"
                        ></a>
                        <div className={'border_dashed'}></div>
                      </TableCell>
                      {rows[0]?.days?.length > 0 ? (
                        <TableCell
                          className={`${
                            row.days[0]?.status === 'red'
                              ? 'bg_light_red'
                              : row.days[0]?.status === 'green'
                              ? 'bg_light_green'
                              : row.days[0]?.status === 'yellow'
                              ? 'bg_light_yellow'
                              : 'bg_white'
                          } `}
                          style={{
                            cursor: 'pointer',
                            width: '86px',
                            maxWidth: '86px',
                            textAlign: 'center',
                          }}
                          onClick={() => {
                            dispatch(getCurrentTask({ current_task: row, index: index }));
                            dispatch(
                              !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                            );
                          }}
                          align="right"
                        >
                          {row?.days[0]?.do === true ? row?.norm : ''}
                        </TableCell>
                      ) : (
                        <TableCell
                          style={{
                            cursor: 'pointer',
                            width: '86px',
                            maxWidth: '86px',
                            textAlign: 'center',
                          }}
                          onClick={() => {
                            dispatch(getCurrentTask({ current_task: row, index: index }));
                            dispatch(
                              !visible ? changeVisibleSideBar() : changeVisibleSideBarCreate('')
                            );
                          }}
                          align="right"
                        >
                          ...
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </div>
  );
};
