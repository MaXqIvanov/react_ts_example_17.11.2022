import React, { useEffect, useState } from 'react';
import styles from '../../scss/AdminCompany.module.scss';
import useDebounce from '../../hooks/use-debounce';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getCompanyAdmin } from '../../store/reducers/company/ActionCompany';

export const NavHeaderAdmCompany = ({ setIsAddedSideBar }: any) => {
  const [position, setPosition] = React.useState('');
  const [search, setSearch] = useState<string>('');
  const handleChange = (event: any) => {
    setPosition(event.target.value);
  };
  const debouncedSearchTerm = useDebounce(search, 300);
  const dispatch = useAppDispatch();
  const { current_company } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getCompanyAdmin({ search: search }));
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
        <div onClick={() => setIsAddedSideBar(true)} className={styles.com_position_btn_added}>
          <span>ДОБАВИТЬ КОМПАНИЮ</span>
        </div>
      </div>
    </div>
  );
};
