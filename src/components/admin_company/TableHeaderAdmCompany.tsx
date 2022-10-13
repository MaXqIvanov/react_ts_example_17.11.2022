import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import footer_left_btn from '../../assets/task/footer_left_btn.svg'
import footer_right_btn from '../../assets/task/footer_right_btn.svg'
import styles from '../../scss/CompanyPosition.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { changePagesCompany, getCompanyAll } from '../../store/companySlice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

function createData(number: number, name_company:string, employes:string,) {
    return { number, name_company, employes };
  }
  
  const rows = [
    createData(1, 'ООО Медвед', "Иванов Иван Иванович"),
    createData(2, 'ООО Медвед2', "Иванов Иван Иванович"), 
    createData(3, 'ООО Медвед3', "Иванов Иван Иванович"),
    createData(4, 'ООО Медвед4', "Иванов Иван Иванович"),
    createData(5, 'ООО Медвед5', "Иванов Иван Иванович"),
  ];

export const TableHeaderAdmCompany = ({setIsVisibleSideBar}:any) => {
    const dispatch = useAppDispatch()
    const {current_page, all_pages} = useSelector((state:RootState)=> state.company)
    useEffect(() => {
      dispatch(getCompanyAll(''))
    }, [current_page])
    
  return (
    <div className={`${styles.table}`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className={'custom_table'}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Компания</TableCell>
                        <TableCell className={`table_cell`} align="left">Сотрудник</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={row.number}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell onClick={()=> setIsVisibleSideBar(true)} style={{width: '1%', cursor: 'pointer'}}  component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell style={{cursor: 'pointer'}} onClick={()=> setIsVisibleSideBar(true)} component="th" scope="row">
                                {row.name_company}
                            </TableCell>
                            <TableCell style={{cursor: 'pointer'}} onClick={()=> setIsVisibleSideBar(true)} align="left">{row.employes}</TableCell>  
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <div className={styles.thead_footer_custom}>
                    <div>страница</div>
                    <div className={styles.footer_group_btn}>
                        <div onClick={()=> dispatch(changePagesCompany(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                        <div className={styles.footer_group_btn_center}>{current_page}</div>
                        <div onClick={()=> dispatch(changePagesCompany(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                    </div>
                    <div>из {all_pages}</div>
                </div>
            </TableContainer>
        </div>
    </div>
  )
}
