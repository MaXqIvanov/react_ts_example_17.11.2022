import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '../../scss/CompanyPosition.module.scss'
import useDebounce from '../../hooks/use-debounce';
import { getPositionCompanyAll } from '../../store/positionSlice';
import { useAppDispatch } from '../../hooks/redux';

export const NavHeaderComPosition = ({setIsAddedSideBar}:any) => {
  const dispatch = useAppDispatch()
  const [position, setPosition] = React.useState('');
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 300);

  const handleChange = (event:any) => {
    setPosition(event.target.value);
  };

  useEffect(() => {
    dispatch(getPositionCompanyAll({search: search}))
  }, [debouncedSearchTerm])
  

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
            <div className='custom_search_wrapper'>
                <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                style={{marginLeft: '10px'}}
                className='custom_search'
                placeholder='Поиск'
                ></input>
                <div className='custom_search_icon'></div>
            </div>
                <div onClick={()=> setIsAddedSideBar(true)} className={styles.com_position_btn_added}><span>ДОБАВИТЬ ДОЛЖНОСТЬ</span></div>              
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