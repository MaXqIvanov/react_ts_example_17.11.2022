import React, { useEffect, useState } from 'react';
import styles from '../../scss/Employes.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useDebounce from '../../hooks/use-debounce';
import { getEmployesAll } from '../../store/reducers/employes/ActionEmployes';

export const NavHeaderEmployes = () => {
  const [position, setPosition] = React.useState('');
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 300);
  const dispatch = useAppDispatch();
  const {} = useSelector((state: RootState) => state.employes);
  const { current_company } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getEmployesAll());
  }, [debouncedSearchTerm, current_company]);

  const handleChange = (event: any) => {
    setPosition(event.target.value);
  };

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
      </div>
    </div>
  );
};
