import React, { useState } from 'react'
import styles from '../../scss/Controls.module.scss'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const NavHeaderControls = () => {
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const handleChange = (event:any) => {
    setPosition(event.target.value);
  };

  return (
    <div className={styles.nav_header}>
        <div className={styles.nav_header_btn}>
          <div className={styles.select_position_wrapper}>
            <FormControl fullWidth className={styles.select_position}>
              <InputLabel id="demo-simple-select-label" className={styles.input_label}>Должность</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={position}
                label="Должность"
                className='custom_select'
                onChange={handleChange}
              >
                <MenuItem value={10}>Менеджер отдела продаж</MenuItem>
                <MenuItem value={20}>Программист</MenuItem>
                <MenuItem value={30}>Админ</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={`${styles.select_position_wrapper}`}>
            <FormControl fullWidth className={`${styles.select_position}`}>
              <InputLabel id="select_simple" className={`${styles.input_label}`}>Статус</InputLabel>
              <Select
                className='custom_select'
                labelId="select_simple"
                id="select_simple"
                value={status}
                label="Статус"
                onChange={(e:any)=> setStatus(e.target.value)}
              >
                <MenuItem value={10}>Выполнено</MenuItem>
                <MenuItem value={20}>Выполняется</MenuItem>
                <MenuItem value={30}>Просроченные</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
    </div>
  )
}
