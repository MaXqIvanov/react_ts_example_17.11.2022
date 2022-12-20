import React, { useEffect, useState } from 'react';
import styles from '../../scss/AdminEmployes.module.scss';
import close_btn from '../../assets/close_btn.svg';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import InputMask from 'react-input-mask';
import useClickOutSide from '../../hooks/useClickOutSide';
import {
  changeEmployesCompanyAdmin,
  getEmployesCompanyAdmin,
} from '../../store/reducers/employes/ActionEmployes';

export const SideBar = ({ setIsVisibleSideBar, isvisible_sidebaer }: any) => {
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<any>('');
  const [name, setNamePosition] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeat_password, setRepeatPassword] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const { user } = useSelector((state: RootState) => state.auth);
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false);
  const [phoneHolder, setPhoneHolder] = useState<string>('');
  const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false);
  const { position_all_admin, employes_admin_current } = useSelector(
    (state: RootState) => state.employes
  );
  const select = useClickOutSide(() => {
    setIsVisibleSelect(false);
  });
  useEffect(() => {
    dispatch(getEmployesCompanyAdmin(''));
  }, []);

  useEffect(() => {
    setNamePosition(employes_admin_current.name);
    setPhoneHolder(employes_admin_current.phone);

    if (position_all_admin?.length > 0) {
      const current_position = position_all_admin.filter(
        (elem: any) => elem.name === employes_admin_current.companies_str_short
      )[0];
      if (current_position) {
        setPosition(current_position);
      }
    }
  }, [employes_admin_current, position_all_admin]);

  return (
    <>
      <div className={styles.user_side_menu}>
        <div className={styles.user_side_menu_wrapper}>
          <div className={styles.modal_window_header}>
            <div>
              <span>Администратор</span>
            </div>
            <div
              onClick={() => setIsVisibleSideBar(!isvisible_sidebaer)}
              style={{ backgroundImage: `url(${close_btn})` }}
              className={styles.close_user_side_menu_btn}
            ></div>
          </div>
          <div className={styles.modal_window_body}>
            <div className={styles.header_user_not_img}>
              <span>
                {(name?.split(' ')[0]?.split('')[0]
                  ? name?.split(' ')[0]?.split('')[0]?.toUpperCase()
                  : '') +
                  (name?.split(' ')[1]?.split('')[0]
                    ? name?.split(' ')[1]?.split('')[0]?.toUpperCase()
                    : '')}
              </span>
            </div>
            <div style={{ marginTop: '10px' }} className={'wrapper_input_percent'}>
              <input
                placeholder="ФИО"
                value={name}
                onChange={(e: any) => setNamePosition(e.target.value)}
              />
            </div>
            <InputMask
              onClick={() => setIsVisibleLabel(false)}
              onBlur={() => setIsVisibleLabel(false)}
              mask="+7 (999) 999-99-99"
              value={phoneHolder}
              onChange={(e: any) => {
                setPhoneHolder(e.target.value);
              }}
              required
              placeholder={'Номер телефона'}
              className={`${styles.input_phone}`}
            />
            <div
              style={{ marginTop: '10px' }}
              onClick={() => setIsVisibleSelect(!isVisibleSelect)}
              className={'custom_select_wrapper_admin'}
            >
              <div className={'select_body'}>{position.name ? position.name : 'Компания'}</div>
              <div className={'select_arrow'}></div>
              {isVisibleSelect && (
                <div ref={select} className={'select_additional'}>
                  {position_all_admin?.length > 0 &&
                    position_all_admin.map((elem: any) => (
                      <div
                        key={elem.id}
                        onClick={() => setPosition(elem)}
                        className={'position_current'}
                      >
                        <span>{elem.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div style={{ marginTop: '10px' }} className={'wrapper_input_percent'}>
              <input
                type={'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ marginTop: '10px' }} className={'wrapper_input_percent'}>
              <input
                type={'password'}
                placeholder="Повторите пароль"
                value={repeat_password}
                onChange={(e: any) => setRepeatPassword(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'right', width: '100%', marginRight: '30px' }}
            className={'custom_btn_wrapper'}
          >
            <div onClick={() => setIsVisibleSideBar(!isvisible_sidebaer)} className={'btn_cancel'}>
              <span>Отмена</span>
            </div>
            <div
              onClick={() =>
                dispatch(
                  changeEmployesCompanyAdmin({
                    phone: phoneHolder,
                    name: name,
                    password: password.length > 0 ? password : null,
                    company: position.id,
                    setIsVisibleSideBar: setIsVisibleSideBar,
                  })
                )
              }
              className={'btn_complete'}
            >
              <span>Соханить</span>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
    </>
  );
};
