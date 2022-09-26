import React from 'react'
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

function createData(number: number, name_position:string, employes:string,) {
    return { number, name_position, employes };
  }
  
  const rows = [
    createData(1, 'Менеджер отдела продаж', "Иванов Иван Иванович"),
    createData(2, 'Менеджер отдела продаж2', "Иванов Иван Иванович"), 
    createData(3, 'Менеджер отдела продаж3', "Иванов Иван Иванович"),
    createData(4, 'Менеджер отдела продаж4', "Иванов Иван Иванович"),
    createData(5, 'Менеджер отдела продаж5', "Иванов Иван Иванович"),
  ];

export const TableHeaderComPosition = () => {
  return (
    <div className={`${styles.table} custom_table`}>
        <div className={styles.table_wrapper}>
            <TableContainer component={Paper} className={'custom_table'}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Должность</TableCell>
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
                                {row.name_position}
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
