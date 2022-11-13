import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '../../scss/Employes.module.scss'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getEmployesAll } from '../../store/employesSlice';
import useDebounce from '../../hooks/use-debounce';

export const NavHeaderEmployes = () => {
  const [position, setPosition] = React.useState('');
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 300);
  const dispatch = useAppDispatch()
  const {} = useSelector((state: RootState)=> state.employes)
  const { current_company } = useSelector((state: RootState)=> state.auth)

  useEffect(() => {
    dispatch(getEmployesAll(''))
}, [debouncedSearchTerm, current_company])

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