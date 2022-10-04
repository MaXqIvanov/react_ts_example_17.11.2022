import React from 'react'
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
import { changeVisibleSideBar } from '../../store/taskSlice';

function createData(number: number, name_task:string, begining:number, OA:any, carbs:number, monday:number,
    thuesday: number, thirtday: number, firstday: number, friday: number, saturday: number, sunday: number, stat: number) {
    return {number, name_task, begining, OA, carbs, monday, thuesday, thirtday, firstday, friday, saturday, sunday, stat};
  }
  
  const rows = [
    createData(1, 'Frozen yoghurt', 159, "file", 24, 4.0, 10, 20, 30, 40, 50, 60, 15),
    createData(2, 'Ice cream sandwich', 237, "file", 37, 4.3, 10, 20, 30, 40, 50, 60, 25),
    createData(3, 'Eclair', 262, "file", 24, 6.0 , 10, 20, 30, 40, 50, 60, 35),
    createData(4, 'Cupcake', 305, "file", 67, 4.3, 10, 20, 30, 40, 50, 60, 15),
    createData(5, 'Gingerbread', 356, "file", 49, 3.9, 10, 20, 30, 40, 50, 60, 25),
  ];

export const TableHeader = () => {
    const { current_variant_table }  = useSelector((state:RootState) => state.task)
    const dispatch = useAppDispatch()
  return (
    <div className={`${styles.table} custom_table`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className={'custom_table'}>
            {
                    current_variant_table === 1 &&
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Название задачи</TableCell>
                        <TableCell align="right">Начало до</TableCell>
                        <TableCell align="right">Норма</TableCell>
                        <TableCell align="right">О/А</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name_task}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell style={{width: '1%'}} component="th" scope="row">
                            {row.number}
                        </TableCell>
                        <TableCell style={{width: '60%'}} component="th" scope="row">
                            {row.name_task}
                        </TableCell>
                        <TableCell align="right">{row.begining}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell style={{backgroundImage: `url(${paperclip_img})`}} className={styles.paperclip_img} align="right"></TableCell>
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
                        <TableCell>№</TableCell>
                        <TableCell>Название задачи</TableCell>
                        <TableCell align="right">Начало до</TableCell>
                        <TableCell align="right">Норма</TableCell>
                        <TableCell align="right">О/А</TableCell>
                        <TableCell align="right">ПН, 12 сен 4.0</TableCell>
                        <TableCell align="right">ВН, 13 сен 5.0</TableCell>
                        <TableCell align="right">СР, 14 сен 6.0</TableCell>
                        <TableCell align="right">ЧТ, 15 сен 7.0</TableCell>
                        <TableCell align="right">ПТ, 16 сен 8.0</TableCell>
                        <TableCell align="right">СБ, 17 сен 7.0</TableCell>
                        <TableCell align="right">ВС, 18 сен 8.0</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name_task}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{width: '1%', cursor: 'pointer'}} component="th" scope="row">
                            {row.number}
                        </TableCell>
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{cursor: 'pointer'}} component="th" scope="row">
                            {row.name_task}
                        </TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.begining}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.carbs}</TableCell>
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{backgroundImage: `url(${paperclip_img})`, cursor: 'pointer'}} className={styles.paperclip_img} align="right"></TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.monday}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.thuesday}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.thirtday}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.firstday}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.friday}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.saturday}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.sunday}</TableCell>
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
                        <TableCell>№</TableCell>
                        <TableCell>Название задачи</TableCell>
                        <TableCell align="right">Начало до</TableCell>
                        <TableCell align="right">Норма</TableCell>
                        <TableCell className={`header_oa`} align="right">О/А</TableCell>
                        <TableCell align="right">СТАТ</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name_task}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{width: '1%', cursor: 'pointer'}} component="th" scope="row">
                            {row.number}
                        </TableCell>
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{width: '60%', cursor: 'pointer'}} component="th" scope="row">
                            {row.name_task}
                        </TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.begining}</TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.carbs}</TableCell>
                        <TableCell onClick={()=> dispatch(changeVisibleSideBar())} style={{backgroundImage: `url(${paperclip_img})`, cursor: 'pointer'}} className={styles.paperclip_img} align="right"></TableCell>
                        <TableCell style={{cursor: 'pointer'}} onClick={()=> dispatch(changeVisibleSideBar())} align="right">{row.stat}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                }
                <div className={styles.thead_footer_custom}>
                    <div>страница</div>
                    <div className={styles.footer_group_btn}>
                        <div style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                        <div className={styles.footer_group_btn_center}>1</div>
                        <div style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                    </div>
                    <div>из 2</div>
                </div>
            </TableContainer>
        </div>
    </div>
  )
}
