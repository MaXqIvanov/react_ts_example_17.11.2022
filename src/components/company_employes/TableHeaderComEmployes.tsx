import React from 'react'
import styles from '../../scss/CompanyEmployes.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import footer_left_btn from '../../assets/task/footer_left_btn.svg'
import footer_right_btn from '../../assets/task/footer_right_btn.svg'

function createData(number: number, name_employ:string, employes:string,) {
    return { number, name_employ, employes };
  }
  
  const rows = [
    createData(1, 'Ярослав Столиков Генадьевич', "Менеджер отдела продаж"),
    createData(2, 'Ярослав Столиков Генадьевич2', "Менеджер отдела продаж"), 
    createData(3, 'Ярослав Столиков Генадьевич3', "Менеджер отдела продаж"),
    createData(4, 'Ярослав Столиков Генадьевич4', "Менеджер отдела продаж"),
    createData(5, 'Ярослав Столиков Генадьевич5', "Менеджер отдела продаж"),
  ];

export const TableHeaderComEmployes = () => {
  return (
    <div className={`${styles.table} custom_table`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>ФИО</TableCell>
                        <TableCell align="left">Сотрудник</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={row.number}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                            <TableCell style={{width: '1%'}}  component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name_employ}
                            </TableCell>
                            <TableCell align="left">{row.employes}</TableCell>  
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