import React, { useEffect, useState } from 'react'
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
import useClickOutSide from '../../hooks/useClickOutSide';

function createData(number: number, name_company:string, employes:string,) {
    return { number, name_company, employes };
  }
  

export const TableHeaderAdmCompany = ({setIsVisibleSideBar}:any) => {
    const dispatch = useAppDispatch()
    const {company_admin_all, company_admin_current} = useSelector((state:RootState)=> state.company)
    const [rows, setRows] = useState<any>([])
    useEffect(() => {
      setRows(company_admin_all)
    }, [company_admin_all])
    const [is_delete_btn, setIsDeleteBtn] = useState<boolean>(false)
    const delete_btn = useClickOutSide(()=> {
        setIsDeleteBtn(false)
    })
    
  return (
    <div className={`${styles.table}`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className={'custom_table'}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№<div className={'border_dashed'}></div></TableCell>
                        <TableCell>Компания<div className={'border_dashed'}></div></TableCell>
                        <TableCell className={`table_cell`} align="left">Сотрудник</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row: typeof rows[0], index: number) => (
                        <TableRow
                        key={row.number}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell onClick={()=> setIsVisibleSideBar(true)} style={{width: '1%', cursor: 'pointer'}}  component="th" scope="row">
                                {index + 1}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell style={{cursor: 'pointer', width: '50%'}} onClick={()=> setIsVisibleSideBar(true)} component="th" scope="row">
                                {row.name_company}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell style={{cursor: 'pointer', width: '50%'}} onClick={()=> setIsVisibleSideBar(true)} align="left">{row.employes}</TableCell>  
                            <TableCell className={styles.custom_cell_table} style={{cursor: 'pointer', width: '21px', maxWidth: '21px', minWidth: '21px'}} onClick={()=>{
                                setIsDeleteBtn(true)
                                // dispatch(getCurrentCompany({admin_current: row, index: index}))
                                //  setIsVisibleSideBar(true)
                                // dispatch(setCurrentEmployes({
                                //     employes_current: row,
                                //     index: index,
                                // }))
                            }} align="center"><div className={styles.btn_table}></div>
                                {is_delete_btn && company_admin_current.id === row.id && <div onClick={()=>
                                {
                                    window.confirm('Вы уверены что хотите удалить компанию ?') &&
                                        // dispatch(deleteEmployesCompanyAdmin(''))
                                        alert('удалил')

                                    
    
                                }} ref={delete_btn} className={'delete_btn'}><span>Удалить</span></div>}
                            </TableCell>  
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {/* <div className={styles.thead_footer_custom}>
                    <div>страница</div>
                    <div className={styles.footer_group_btn}>
                        <div onClick={()=> dispatch(changePagesCompany(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                        <div className={styles.footer_group_btn_center}>{current_page}</div>
                        <div onClick={()=> dispatch(changePagesCompany(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                    </div>
                    <div>из {all_pages}</div>
                </div> */}
            </TableContainer>
        </div>
    </div>
  )
}
