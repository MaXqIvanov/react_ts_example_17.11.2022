import React, { useEffect, useState } from 'react'
import styles from '../../scss/Task.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import footer_left_btn from '../../assets/task/footer_left_btn.svg'
import footer_right_btn from '../../assets/task/footer_right_btn.svg'
import paperclip_img from '../../assets/task/mdi_paperclip.svg'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks/redux';
import { changePagesAll, changePagesDay, changePagesWeek, changeVisibleSideBar, getTaskAll, getTaskDay, getTaskWeek } from '../../store/taskSlice';

function createData(number: number, name_task:string, begining:number, OA:any, carbs:number, monday:number,
    thuesday: number, thirtday: number, firstday: number, friday: number, saturday: number, sunday: number, stat: number) {
    return {number, name_task, begining, OA, carbs, monday, thuesday, thirtday, firstday, friday, saturday, sunday, stat};
  }
  
//   const rows = [
//     createData(1, 'Frozen yoghurt', 159, "file", 24, 4.0, 10, 20, 30, 40, 50, 60, 15),
//     createData(2, 'Ice cream sandwich', 237, "file", 37, 4.3, 10, 20, 30, 40, 50, 60, 25),
//     createData(3, 'Eclair', 262, "file", 24, 6.0 , 10, 20, 30, 40, 50, 60, 35),
//     createData(4, 'Cupcake', 305, "file", 67, 4.3, 10, 20, 30, 40, 50, 60, 15),
//     createData(5, 'Gingerbread', 356, "file", 49, 3.9, 10, 20, 30, 40, 50, 60, 25),
//   ];


export const TableHeader = ({visible, current_day_task}:any) => {
    const { current_variant_table, current_page_day, all_pages_day, current_page_week, all_pages_week, current_page_all, all_pages_all, get_all_task_week }
    = useSelector((state:RootState) => state.task)
    
    const dispatch = useAppDispatch()
    const [isVisibleHref, setIsVisibleHref] = useState<any>(null)
    const [rows, setRows] = useState<any>([])
    useEffect(() => {
        setRows(get_all_task_week)
    }, [get_all_task_week])
    
    
  return (
    <div onClick={()=>isVisibleHref !== null && setIsVisibleHref(null)} className={`${styles.table} custom_table_task`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className={'custom_table'}>
            {
                    current_variant_table === 1 &&
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{borderLeft: '0px'}}>№</TableCell>
                        <TableCell>Название задачи</TableCell>
                        <TableCell align="right">Начало до</TableCell>
                        <TableCell align="right">Норма</TableCell>
                        <TableCell className={`table_cell`} align="right">О/А</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows?.length > 0 && rows.map((row:any, index: number) => (
                        <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell style={{width: '1%'}} component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell style={{width: '60%'}} component="th" scope="row">
                            {row.name_task}
                        </TableCell>
                        <TableCell align="right">{row.begining}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell onClick={()=> setIsVisibleHref(row.number)} style={{backgroundImage: `url(${paperclip_img})` , width: '30px'}} className={styles.paperclip_img} align="right">
                        {isVisibleHref === row.number && <div className={styles.href_link}><a href='https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0'>https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0</a></div> }
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                }
                {
                    current_variant_table === 2 &&
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№<div className={'border_dashed'}></div></TableCell>
                        <TableCell >Название задачи<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">Начало до<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">Норма<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">О/А<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">{rows[0]?.days[0]?.weekday}, {rows[0]?.days[0]?.day} {rows[0]?.days[0]?.month}<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">{rows[0]?.days[1]?.weekday}, {rows[0]?.days[1]?.day} {rows[0]?.days[1]?.month}<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">{rows[0]?.days[2]?.weekday}, {rows[0]?.days[2]?.day} {rows[0]?.days[2]?.month}<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">{rows[0]?.days[3]?.weekday}, {rows[0]?.days[3]?.day} {rows[0]?.days[3]?.month}<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">{rows[0]?.days[4]?.weekday}, {rows[0]?.days[4]?.day} {rows[0]?.days[4]?.month}<div className={'border_dashed'}></div></TableCell>
                        <TableCell align="center">{rows[0]?.days[5]?.weekday}, {rows[0]?.days[5]?.day} {rows[0]?.days[5]?.month}<div className={'border_dashed'}></div></TableCell>
                        <TableCell className={`table_cell ${styles.table_cell}`} align="center">{rows[0]?.days[6]?.weekday}, {rows[0]?.days[6]?.day} {rows[0]?.days[6]?.month}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows?.length > 0 && rows?.map((row:any, index: number) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{width: '1%', cursor: 'pointer'}} component="th" scope="row">
                            {index + 1}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{cursor: 'pointer'}} component="th" scope="row">
                            {row.name}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.start_before}
                        <div className={'border_dashed'}></div></TableCell>
                        <TableCell style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.norm}
                        <div className={'border_dashed'}></div></TableCell>
                        <TableCell onClick={()=> setIsVisibleHref(row.id)} style={{backgroundImage: `url(${paperclip_img})`, cursor: 'pointer', width: '29px'}} className={styles.paperclip_img} align="right">
                            <a target={'_blank'} href={row.artefact} className={`${styles.table_link}`}>

                            </a>
                            {/* {isVisibleHref === row?.id &&
                            <div className={styles.href_link}>
                                <a href='https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0'>
                                    https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0
                                </a>
                            </div> } */}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[0]?.status === 'red' ? 'bg_light_red' : row.days[0]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `}
                         style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">
                            {row?.days[0]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[1]?.status === 'red' ? 'bg_light_red' : row.days[1]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `}
                         style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">
                            {row?.days[1]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[2]?.status === 'red' ? 'bg_light_red' : row.days[2]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `}
                         style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">
                            {row?.days[2]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[3]?.status === 'red' ? 'bg_light_red' : row.days[3]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `}
                         style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">
                            {row?.days[3]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[4]?.status === 'red' ? 'bg_light_red' : row.days[4]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `}
                         style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">
                            {row?.days[4]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[5]?.status === 'red' ? 'bg_light_red' : row.days[5]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `}
                         style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">
                            {row?.days[5]?.do === true ? row?.norm : ''}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[6]?.status === 'red' ? 'bg_light_red' : row.days[6]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `}
                         style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">
                            {row?.days[6]?.do === true ? row?.norm : ''}
                            {/* <div className={'border_dashed'}></div> */}
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                }
                     {
                    current_variant_table === 3 &&
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№<div className={'border_dashed'}></div></TableCell>
                        <TableCell>Название задачи<div className={'border_dashed'}></div></TableCell>
                        <TableCell style={{textAlign: 'center'}} align="right">Начало до<div className={'border_dashed'}></div></TableCell>
                        <TableCell style={{textAlign: 'center'}} align="right">Норма<div className={'border_dashed'}></div></TableCell>
                        <TableCell style={{minWidth: '20px', textAlign: 'center'}} className={`header_oa`} align="right">О/А<div className={'border_dashed'}></div></TableCell>
                        <TableCell style={{textAlign: 'center'}} className={`table_cell`} align="right">{rows[0]?.days[0]?.weekday}, {rows[0]?.days[0]?.day} {rows[0]?.days[0]?.month}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows?.length > 0 && rows.map((row:any, index: number) => (
                        <TableRow
                        key={row.id}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{width: '1%', cursor: 'pointer'}} component="th" scope="row">
                            {index + 1}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{width: '60%', cursor: 'pointer'}} component="th" scope="row">
                            {row.name}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.start_before}
                        <div className={'border_dashed'}></div></TableCell>
                        <TableCell style={{cursor: 'pointer', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.norm}
                        <div className={'border_dashed'}></div></TableCell>
                        <TableCell onClick={()=> setIsVisibleHref(row.number)} style={{backgroundImage: `url(${paperclip_img})`, cursor: 'pointer', width: '30px', textAlign: 'center'}} className={styles.paperclip_img} align="right">
                            <a target={'_blank'} href={row.artefact} className={`${styles.table_link}`}></a>
                            {/* {isVisibleHref === row.number && <div className={styles.href_link}><a href='https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0'>
                            https://docs.google.com/spreadsheets/d/1eBRil4htjVMB4hLBvloanO9RsLUjgTb9Вp7FqjRvorw/edit#gid=0</a></div> } */}
                            <div className={'border_dashed'}></div>
                        </TableCell>
                        <TableCell className={`${row.days[0]?.status === 'red' ? 'bg_light_red' : row.days[0]?.status === 'green' ? 'bg_light_green' : row.start_before !== null ? 'bg_light_yellow' : 'bg_white'} `} style={{cursor: 'pointer', width: '90px', textAlign: 'center'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row?.days[0]?.do === true ? row?.norm : ''}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                }
                {
                    current_variant_table === 1 &&
                    <div className={styles.thead_footer_custom}>
                        <div>страница</div>
                        <div className={styles.footer_group_btn}>
                            <div onClick={()=> dispatch(changePagesAll(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                            <div className={styles.footer_group_btn_center}>{current_page_all}</div>
                            <div onClick={()=> dispatch(changePagesAll(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                        </div>
                        <div>из {all_pages_day}</div>
                    </div>
                }
                {
                    current_variant_table === 2 &&
                    <div className={styles.thead_footer_custom}>
                        <div>страница</div>
                        <div className={styles.footer_group_btn}>
                            <div onClick={()=> dispatch(changePagesWeek(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                            <div className={styles.footer_group_btn_center}>{current_page_week}</div>
                            <div onClick={()=> dispatch(changePagesWeek(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                        </div>
                        <div>из {all_pages_week}</div>
                    </div>
                }
                {
                    current_variant_table === 3 &&
                    <div className={styles.thead_footer_custom}>
                        <div>страница</div>
                        <div className={styles.footer_group_btn}>
                            <div onClick={()=> dispatch(changePagesDay(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                            <div className={styles.footer_group_btn_center}>{current_page_day}</div>
                            <div onClick={()=> dispatch(changePagesDay(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                        </div>
                        <div>из {all_pages_all}</div>
                    </div>
                }
            </TableContainer>
        </div>
    </div>
  )
}
