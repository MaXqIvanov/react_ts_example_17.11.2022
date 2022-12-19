import React, { useEffect, useState } from 'react';
import styles from '../../scss/CompanyEmployes.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/store';
import useDebounce from '../../hooks/use-debounce';
import { getEmployesCompany } from '../../store/reducers/employes/ActionEmployes';

export const NavHeaderComEmployes = ({ setIsAddedSideBar, setIsSearchSideBar }: any) => {
  const [position, setPosition] = React.useState('');
  const [search, setSearch] = useState<string>('');
  const handleChange = (event: any) => {
    setPosition(event.target.value);
  };
  const debouncedSearchTerm = useDebounce(search, 300);
  const dispatch = useAppDispatch();
  const { current_company } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getEmployesCompany({ search: search }));
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
          <span>Добавить сотрудника</span>
        </div>
      </div>
    </div>
  );
};
