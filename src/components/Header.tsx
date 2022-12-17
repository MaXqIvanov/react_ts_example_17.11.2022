import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../scss/Component.module.scss';
import close_btn from '../assets/close_btn.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import camera_img from '../assets/camera_img.svg';
import { Button, TextField } from '@mui/material';
import InputMask from 'react-input-mask';
import { useAppDispatch } from '../hooks/redux';
import { changeCurrentCompany, logout } from '../store/reducers/auth/authSlice';
import img_user from '../assets/img_user.svg';
import useClickOutSide from '../hooks/useClickOutSide';

interface IPropsHeader {
  setIsVisibleSideBar: CallableFunction;
  isVusubleSideBar: boolean;
  setIsCollapseSideBar: CallableFunction;
  isCollapseSideBar: boolean;
}
export const Header = ({
  setIsVisibleSideBar,
  isVusubleSideBar,
  setIsCollapseSideBar,
  isCollapseSideBar,
}: IPropsHeader) => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const [isVisibleUserMenu, setIsVisibleUserMenu] = useState<boolean>(false);
  const { user, user_company, current_company } = useSelector((state: RootState) => state.auth);
  const [phoneHolder, setPhoneHolder] = useState<string>('');
  const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  // for ui
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false);
  const custom_select = useClickOutSide(() => {
    setIsVisibleLabel(false);
  });

  return (
    <div id="header" className={styles.header}>
      <div className={styles.header_wrapper}>
        <div className={styles.group_header}>
          <div
            onClick={() => setIsCollapseSideBar(!isCollapseSideBar)}
            className={styles.sidebar_icon_collapse}
          ></div>
          <div onClick={() => router('/')} className={styles.header_logo}>
            WorkTracker
          </div>
        </div>
        <div className={styles.group_header}>
          <div className={styles.header_name_group}>
            <div
              onClick={() => setIsVisibleLabel(!isVisibleLabel)}
              className={styles.header_name_company}
            >
              <span>
                {current_company?.name
                  ? current_company?.name
                  : 'вы не состоите ни в одной компании'}
              </span>
            </div>
            {isVisibleLabel &&
              (user_company?.length > 0 ? (
                <div
                  ref={custom_select}
                  onClick={() => setIsVisibleLabel(true)}
                  className={styles.header_name_company_wrapper}
                >
                  {user_company.map((elem: any) => (
                    <div
                      onClick={() => {
                        dispatch(
                          changeCurrentCompany({ elem: elem, setIsVisibleLabel: setIsVisibleLabel })
                        );
                      }}
                      key={elem.id}
                      className={`${styles.one_company_name}`}
                    >
                      <span>{elem.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  ref={custom_select}
                  onClick={() => setIsVisibleLabel(true)}
                  className={styles.header_name_company_wrapper}
                >
                  <div className={`${styles.one_company_name}`}>
                    <span>Данных нет</span>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.separate_line_for_header}></div>
          <div
            onClick={() => setIsVisibleUserMenu(!isVisibleUserMenu)}
            style={{ backgroundImage: user?.avatar ? `url(${user?.avatar})` : `none` }}
            className={user?.avatar ? styles.header_user_img : styles.header_user_not_img}
          >
            <span>
              {user?.avatar
                ? ''
                : user?.name?.split(' ')[0]?.split('')[0]
                ? user?.name?.split(' ')[0]?.split('')[0]?.toUpperCase()
                : '' + user?.name?.split(' ')[1]?.split('')[0]
                ? user?.name?.split(' ')[1]?.split('')[0]?.toUpperCase()
                : ''}
            </span>
          </div>
        </div>
      </div>
      {isVisibleUserMenu && (
        <>
          <div className={styles.user_side_menu}>
            <div className={styles.user_side_menu_wrapper}>
              <div
                onClick={() => setIsVisibleUserMenu(!isVisibleUserMenu)}
                style={{ backgroundImage: `url(${close_btn})` }}
                className={styles.close_user_side_menu_btn}
              ></div>
              <div className={styles.text_field_block}>
                <div className={styles.group_img_user}>
                  <div
                    style={{
                      backgroundImage: user.profile_img
                        ? `url(${user.profile_img})`
                        : `url(${img_user})`,
                    }}
                    className={styles.img_user}
                  ></div>
                  <Button
                    component="label"
                    style={{ backgroundImage: `url(${camera_img})` }}
                    className={styles.img_user_added_photo}
                  >
                    <input type="file" hidden />
                  </Button>
                </div>
                <TextField
                  className={`${styles.text_field}`}
                  label="ФИО"
                  InputProps={{
                    type: 'string',
                  }}
                />
                <TextField
                  className={`${styles.text_field}`}
                  label="Должность"
                  InputProps={{
                    type: 'string',
                  }}
                />
                <div className={styles.group_input_mask}>
                  <label
                    className={
                      phoneHolder && phoneHolder!.match(/[0-9]/g)!.length > 0
                        ? `${styles.visible_label}`
                        : ''
                    }
                  >
                    Номер телефона
                  </label>
                  <InputMask
                    onClick={() => setIsVisibleLabel(true)}
                    onBlur={() => setIsVisibleLabel(false)}
                    mask="+7(999)999-99-99"
                    value={phoneHolder}
                    onChange={(e: any) => {
                      setPhoneHolder(e.target.value);
                    }}
                    required
                    placeholder={'Номер телефона'}
                    className={`form-input ${styles.input_phone} ${styles.text_field}`}
                  />
                </div>
                <TextField
                  className={`${styles.text_field}`}
                  label="Новый пароль"
                  InputProps={{
                    type: 'password',
                  }}
                />
                <TextField
                  className={`${styles.text_field}`}
                  label="Повторить пароль"
                  InputProps={{
                    type: 'password',
                  }}
                />
              </div>
              <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div
                    onClick={() => setIsVisibleUserMenu(!isVisibleUserMenu)}
                    className={styles.btn_cancel_side_bar}
                  >
                    ОТМЕНА
                  </div>
                  <div className={styles.btn_save_side_bar}>
                    <span>СОХРАНИТЬ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setIsVisibleUserMenu(false);
              setIsVisibleAlert(false);
            }}
            className={styles.user_side_menu_plug}
          ></div>
        </>
      )}
      {isVisibleAlert && (
        <div className={styles.alert}>
          <div className={styles.alert_title}>Вы действительо хотите выйти ?</div>
          <div className={styles.alert_btn_group}>
            <div onClick={() => setIsVisibleAlert(false)} className={styles.btn_cancel}>
              ОТМЕНА
            </div>
            <div
              onClick={() => {
                dispatch(logout(router));
                setIsVisibleSideBar(false);
              }}
              className={styles.btn_accept}
            >
              ДА
            </div>
          </div>
          <div onClick={() => setIsVisibleAlert(false)} className={styles.btn_cancel_img}></div>
        </div>
      )}
    </div>
  );
};
