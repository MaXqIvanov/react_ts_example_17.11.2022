import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '../../scss/CompanyPosition.module.scss'

export const NavHeaderAdmCompany = () => {
  const [position, setPosition] = React.useState('');

  const handleChange = (event:any) => {
    setPosition(event.target.value);
  };

  return (
    <div className={styles.nav_header}>
        <div className={styles.nav_header_btn}>
          {/* <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="freeSolo" />}
            />
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => ( */}
              <div className={styles.com_position_btn_added}>ДОБАВИТЬ КОМПАНИЮ +</div>              
                <TextField
                  className='custom_search'
                  label="Поиск..."
                  InputProps={{
                    type: 'search',
                  }}
                />
              {/* )}
            />
          </Stack> */}
        </div>
    </div>
  )
}

// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
// ];