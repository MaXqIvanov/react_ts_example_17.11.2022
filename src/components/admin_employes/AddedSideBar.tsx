import React, { useEffect, useState } from 'react';
import styles from '../../scss/AdminEmployes.module.scss';
import close_btn from '../../assets/close_btn.svg';
import { useAppDispatch } from '../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import InputMask from 'react-input-mask';
import useClickOutSide from '../../hooks/useClickOutSide';
import {
  createEmployesCompanyAdmin,
  getEmployesCompanyAdmin,
} from '../../store/reducers/employes/ActionEmployes';

interface props {
  setIsAddedSideBar: CallableFunction;
  isadded_sidebar: boolean;
}
export const AddedSideBar = ({ setIsAddedSideBar, isadded_sidebar }: props) => {
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
  const { position_all_admin } = useSelector((state: RootState) => state.employes);
  const select = useClickOutSide(() => {
    setIsVisibleSelect(false);
  });
  useEffect(() => {
    dispatch(getEmployesCompanyAdmin());
  }, []);

  return (
    <>
      <div className={styles.user_side_menu}>
        <div className={styles.user_side_menu_wrapper}>
          <div className={styles.modal_window_header}>
            <div>
              <span>Администратор</span>
            </div>
            <div
              onClick={() => setIsAddedSideBar(!isadded_sidebar)}
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
            <div onClick={() => setIsAddedSideBar(!isadded_sidebar)} className={'btn_cancel'}>
              <span>Отмена</span>
            </div>
            <div
              onClick={() =>
                dispatch(
                  createEmployesCompanyAdmin({
                    phone: phoneHolder,
                    name: name,
                    password: password,
                    company: position.id,
                    setIsAddedSideBar: setIsAddedSideBar,
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
      <div onClick={() => setIsAddedSideBar(false)} className={styles.user_side_menu_plug}></div>
    </>
  );
};
