import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import com_employes_btn_added from '../../assets/company/la_user-plus.svg';
import com_employes_btn_changed from '../../assets/company/la_user-cog.svg';
import styles from '../../scss/AdminEmployes.module.scss';
import useDebounce from '../../hooks/use-debounce';
import { useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { getEmployesAdmin } from '../../store/reducers/employes/ActionEmployes';

export const NavHeaderAdmEmployes = ({ setIsAddedSideBar }: any) => {
  const [position, setPosition] = React.useState('');
  const [search, setSearch] = useState<string>('');
  const handleChange = (event: any) => {
    setPosition(event.target.value);
  };
  const debouncedSearchTerm = useDebounce(search, 300);
  const dispatch = useAppDispatch();
  const { current_company } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getEmployesAdmin({ search: search }));
  }, [debouncedSearchTerm, current_company]);

  return (
    <div className={styles.nav_header}>
      <div className={styles.nav_header_btn}>
        <div className="custom_search_wrapper">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            style={{ marginLeft: '10px' }}
            className="custom_search"
            placeholder="Поиск"
          ></input>
          <div className="custom_search_icon"></div>
        </div>
        <div onClick={() => setIsAddedSideBar(true)} className={styles.added_employes}>
          <span>Добавить администратора</span>
        </div>
      </div>
    </div>
  );
};
