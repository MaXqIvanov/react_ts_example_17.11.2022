import React, { useEffect } from 'react'
import styles from '../../scss/Employes.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import footer_left_btn from '../../assets/task/footer_left_btn.svg'
import footer_right_btn from '../../assets/task/footer_right_btn.svg'
import { useAppDispatch } from '../../hooks/redux';
import { changePages, getEmployesAll } from '../../store/employesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function createData(number: number, position:string, employes:string,) {
    return { number, position, employes };
  }
  
  const rows = [
    createData(1, 'Frozen yoghurt', "Менеджер отдела продаж"),
    createData(2, 'Ice cream sandwich', "Менеджер отдела продаж"), 
    createData(3, 'Eclair', "Менеджер отдела продаж"),
    createData(4, 'Cupcake', "Менеджер отдела продаж"),
    createData(5, 'Gingerbread', "Менеджер отдела продаж"),
  ];

export const TableHeaderEmployes = ({setIsVisibleSideBar}:any) => {
    const dispatch = useAppDispatch()
    const {current_page, all_pages} = useSelector((state: RootState)=> state.employes)
    useEffect(() => {
        dispatch(getEmployesAll(current_page))
    }, [current_page])
    
  return (
    <div className={`${styles.table}`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className="custom_table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Должность</TableCell>
                        <TableCell className={`table_cell`} align="left">Сотрудник</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.position}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell onClick={()=> setIsVisibleSideBar(true)} style={{width: '1%', cursor: 'pointer'}}  component="th" scope="row">
                                {row.number}
                            </TableCell>
                            <TableCell style={{cursor: 'pointer'}} onClick={()=> setIsVisibleSideBar(true)} component="th" scope="row">
                                {row.position}
                            </TableCell>
                            <TableCell style={{cursor: 'pointer'}} onClick={()=> setIsVisibleSideBar(true)} align="left">{row.employes}</TableCell>  
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <div className={styles.thead_footer_custom}>
                    <div>страница</div>
                    <div className={styles.footer_group_btn}>
                        <div onClick={()=> dispatch(changePages(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                        <div className={styles.footer_group_btn_center}>{current_page}</div>
                        <div onClick={()=> dispatch(changePages(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                    </div>
                    <div>из {all_pages}</div>
                </div>
            </TableContainer>
        </div>
    </div>
  )
}
