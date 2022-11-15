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
import { changePages, getCurrentPositionCompany, getPosition } from '../../store/positionSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function createData(number: number, name_position:string, employes:string,) {
    return { number, name_position, employes };
  }
  

export const TableHeaderComPosition = ({setIsVisibleSideBar}:any) => {
    const {current_page, all_pages, position_company_all} = useSelector((state:RootState)=> state.position)
    const dispatch = useAppDispatch()
    const [rows, setRows] = useState<any>([])
    useEffect(() => {
      setRows(position_company_all)
    }, [position_company_all])
    
    
    
  return (
    <div className={`${styles.table}`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className={'custom_table'}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№<div className={'border_dashed'}></div></TableCell>
                        <TableCell>Должность<div className={'border_dashed'}></div></TableCell>
                        <TableCell className={`table_cell`} align="left">ФИО<div className={'border_dashed'}></div></TableCell>
                        <TableCell className={`table_cell`} align="center"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row:any, index:number) => (
                        <TableRow
                        key={row.number}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell onClick={()=> {
                                setIsVisibleSideBar(true)
                                    dispatch(getCurrentPositionCompany({index: index, current_position_company: row}))
                                }} style={{width: '1%', cursor: 'pointer'}}  component="th" scope="row">
                                {index + 1}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell style={{cursor: 'pointer', width: '50%'}} onClick={()=> {
                                setIsVisibleSideBar(true)
                                dispatch(getCurrentPositionCompany({index: index, current_position_company: row}))
                            }} component="th" scope="row">
                                {row.name}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell style={{cursor: 'pointer', width: '50%'}} onClick={()=> {
                                setIsVisibleSideBar(true)
                                dispatch(getCurrentPositionCompany({index: index, current_position_company: row}))
                            }} align="left">{row.employes}
                                <div className={'border_dashed'}></div>
                            </TableCell>
                            <TableCell className={styles.custom_cell_table} style={{cursor: 'pointer', width: '30px', maxWidth: '30px', minWidth: '30px'}}
                                // onClick={()=>{
                                //  setIsVisibleSideBar(true)
                                //     dispatch(setCurrentEmployes({
                                //         employes_current: row,
                                //         index: index,
                                //     }))
                                // }}
                                align="center"><div className={styles.btn_table}></div>
                            </TableCell>  
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {/* <div className={styles.thead_footer_custom}>
                    <div>страница</div>
                    <div className={styles.footer_group_btn}>
                        <div onClick={()=> dispatch(changePages(-1))} style={{backgroundImage: `url(${footer_left_btn})`}} className={styles.footer_group_btn_left}></div>
                        <div className={styles.footer_group_btn_center}>{current_page}</div>
                        <div onClick={()=> dispatch(changePages(1))} style={{backgroundImage: `url(${footer_right_btn})`}} className={styles.footer_group_btn_right}></div>
                    </div>
                    <div>из {all_pages}</div>
                </div> */}
            </TableContainer>
        </div>
    </div>
  )
}

