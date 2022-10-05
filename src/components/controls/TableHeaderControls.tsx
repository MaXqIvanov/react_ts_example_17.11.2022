import React, { useEffect } from 'react'
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
import { useAppDispatch } from '../../hooks/redux';
import { getControlTaskAll } from '../../store/controlSlice';

function createData(number: number, name_task:string, position:string, OA:number,) {
    return { number, name_task, position, OA };
  }
  
  const rows = [
    createData(1, 'Frozen yoghurt', "Менеджер отдела продаж", 15),
    createData(2, 'Ice cream sandwich', "Менеджер отдела продаж", 15), 
    createData(3, 'Eclair', "Менеджер отдела продаж", 14),
    createData(4, 'Cupcake', "Менеджер отдела продаж", 12),
    createData(5, 'Gingerbread', "Менеджер отдела продаж", 10),
  ];

export const TableHeaderControls = ({setIsVisibleSideBar}:any) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getControlTaskAll(''))
    }, [])
    
  return (
    <div className={`${styles.table} custom_table`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className="custom_table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Название задачи</TableCell>
                        <TableCell align="left">Должность</TableCell>
                        <TableCell style={{width:'1%'}} align="left">Норма</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name_task}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell onClick={()=> setIsVisibleSideBar(true)} style={{width:'1%', cursor: 'pointer'}}  component="th" scope="row">
                                {row.number}
                            </TableCell>
                            <TableCell style={{cursor: 'pointer'}} onClick={()=> setIsVisibleSideBar(true)} component="th" scope="row">
                                {row.name_task}
                            </TableCell>
                            <TableCell style={{cursor: 'pointer'}} onClick={()=> setIsVisibleSideBar(true)} align="left">{row.position}</TableCell>
                            <TableCell onClick={()=> setIsVisibleSideBar(true)} style={{width:'10%', cursor: 'pointer'}} className={styles.paperclip_img} align="left">{row.OA }</TableCell>        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
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
