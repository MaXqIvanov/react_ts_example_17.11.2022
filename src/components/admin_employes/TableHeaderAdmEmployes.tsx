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
import styles from '../../scss/AdminEmployes.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { deleteEmployesCompanyAdmin, getCurrentAdmin, getEmployesAdmin } from '../../store/employesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useClickOutSide from '../../hooks/useClickOutSide';

export const TableHeaderAdmEmployes = ({setIsVisibleSideBar}:any) => {
    const dispatch = useAppDispatch()
    const {employes_admin_all, employes_admin_current} = useSelector((state:RootState)=> state.employes)
    const [rows, setRows] = useState<any>([])
    useEffect(() => {
      setRows(employes_admin_all)
    }, [employes_admin_all])
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
                        <TableCell className={`table_cell`}>ФИО<div className={'border_dashed'}></div></TableCell>
                        <TableCell className={`table_cell`}>Компания<div className={'border_dashed'}></div></TableCell>
                        <TableCell className={`table_cell`}></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row: typeof rows[0], index:number) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell onClick={()=> {
                                 setIsVisibleSideBar(true)
                                  dispatch(getCurrentAdmin({admin_current: row, index: index}))
                                 }} style={{width: '1%', cursor: 'pointer'}}  component="th" scope="row">
                                {index + 1}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell className={`table_cell`} style={{cursor: 'pointer', width: '50%'}} onClick={()=> {
                                 setIsVisibleSideBar(true)
                                 dispatch(getCurrentAdmin({admin_current: row, index: index}))
                                }} component="th" scope="row">
                                {row.name}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell className={`table_cell`} style={{cursor: 'pointer', width: '50%'}} onClick={()=> {
                                 setIsVisibleSideBar(true)
                                 dispatch(getCurrentAdmin({admin_current: row, index: index}))
                                }} component="th" scope="row">
                                {row.companies_str_short}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell className={styles.custom_cell_table} style={{cursor: 'pointer', width: '21px', maxWidth: '21px', minWidth: '21px'}} onClick={()=>{
                                setIsDeleteBtn(true)
                                dispatch(getCurrentAdmin({admin_current: row, index: index}))
                                //  setIsVisibleSideBar(true)
                                // dispatch(setCurrentEmployes({
                                //     employes_current: row,
                                //     index: index,
                                // }))
                            }} align="center"><div className={styles.btn_table}></div>
                                {is_delete_btn && employes_admin_current.id === row.id && <div onClick={()=>
                                {
                                    window.confirm('Вы уверены что хотите удалить администратора ?') &&
                                        dispatch(deleteEmployesCompanyAdmin(''))
                                    
    
                                }} ref={delete_btn} className={'delete_btn'}><span>Удалить</span></div>}
                            </TableCell>  
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {/* <div className={styles.thead_footer_custom}>
                    <div>страница</div>
                    <div className={styles.footer_group_btn}>
                        <div onClick={()=> dispatch(changePagesAdminEmployes(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                        <div className={styles.footer_group_btn_center}>{current_page_admin_employes}</div>
                        <div onClick={()=> dispatch(changePagesAdminEmployes(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                    </div>
                    <div>из {all_pages_admin_employes}</div>
                </div> */}
            </TableContainer>
        </div>
    </div>
  )
}
