import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../scss/Component.module.scss';
import close_btn from '../assets/close_btn.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import camera_img from '../assets/camera_img.svg';
import { Button, TextField } from '@mui/material';
import InputMask from 'react-input-mask';
import { useAppDispatch } from '../hooks/redux';
import { logout } from '../store/authSlice';
import img_user from '../assets/img_user.svg';

export const Header = ({setIsVisibleSideBar}:any) => {
  const router = useNavigate()
  const dispatch = useAppDispatch()
  const [isVisibleUserMenu, setIsVisibleUserMenu] = useState<boolean>(false)
  const {user} = useSelector((state:RootState)=> state.auth)
  const [phoneHolder, setPhoneHolder] = useState<string>('')
  const [isVisibleAlert, setIsVisibleAlert] = useState<boolean>(false)
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
  // for ui
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false)

  useEffect(() => {
    if(window.location.pathname !== '/auth'){
      setIsVisibleSideBar(true)
    }else{
      setIsVisibleSideBar(false)
    }
  }, [window.location.href])
  return (
    <div id="header" className={styles.header}>
      <div className={styles.header_wrapper}>
        <div className={styles.group_header}>
          <div onClick={()=> router('/')} className={styles.header_logo}>WorkTracker</div>
        </div>
        <div className={styles.group_header}>
          <div className={styles.header_name_group}>
            <div onClick={()=> setIsVisibleLabel(!isVisibleLabel)} className={styles.header_name_company}><span>ООО “Купипродай”</span></div>
            {
              isVisibleLabel && 
                <div onClick={()=> setIsVisibleLabel(true)} className={styles.header_name_company_wrapper}>
                  <div className={`${styles.one_company_title}`}>Выбрать компанию
                    <div className={`${styles.separate_line}`}></div>
                  </div>
                  <div className={`${styles.one_company_name}`}>ООО “Купипродай”</div>
                  <div className={`${styles.one_company_name}`}>ООО “Соберипострой"</div>
                </div>
            }
          </div>
          <div className={styles.header_name}>Иванов Иван Иванович</div>
          <div onClick={()=> setIsVisibleUserMenu(!isVisibleUserMenu)} style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}}
          className={styles.header_user_img}></div>
        </div>
      </div>
      {isVisibleUserMenu &&
      <>
        <div className={styles.user_side_menu}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsVisibleUserMenu(!isVisibleUserMenu)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            {/* <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
              />
            </Button> */}
            <div className={styles.text_field_block}>
              <div className={styles.group_img_user}>
                <div style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}} className={styles.img_user}></div>
                <Button component="label" style={{backgroundImage: `url(${camera_img})`}} className={styles.img_user_added_photo}>
                  <input
                    type="file"
                    hidden
                  />
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
                <label className={phoneHolder && phoneHolder!.match(/[0-9]/g)!.length > 0 ? `${styles.visible_label}` : ''}>Номер телефона</label>
                <InputMask onClick={()=> setIsVisibleLabel(true)} onBlur={()=> setIsVisibleLabel(false)} mask="+7(999)999-99-99" value={phoneHolder} onChange={((e:any) => {
                  setPhoneHolder(e.target.value)
                })} required placeholder={'Номер телефона'} className={`form-input ${styles.input_phone} ${styles.text_field}`} />
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
                  <div onClick={()=> setIsVisibleUserMenu(!isVisibleUserMenu)} className={styles.btn_cancel_side_bar}>ОТМЕНА</div>
                  <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
                </div>
                {/* <div onClick={()=> setIsVisibleAlert(true)} className={styles.btn_quit_account}>ВЫЙТИ</div> */}
                {/* <div onClick={()=> setIsVisibleAlert(true)} className={styles.btn_exit_profile}></div> */}
            </div>
          </div>
        </div>
        <div onClick={()=> {
          setIsVisibleUserMenu(false)
          setIsVisibleAlert(false)
        }} className={styles.user_side_menu_plug}></div>
      </>
      }
      {isVisibleAlert &&
      <div className={styles.alert}>
        <div className={styles.alert_title}>Вы действительо хотите выйти ?</div>
        <div className={styles.alert_btn_group}>
          <div onClick={()=> setIsVisibleAlert(false)} className={styles.btn_cancel}>ОТМЕНА</div>
          <div onClick={()=> {
            dispatch(logout(router))
            setIsVisibleSideBar(false)
          }} className={styles.btn_accept}>ДА</div>
        </div>
        <div onClick={()=> setIsVisibleAlert(false)} className={styles.btn_cancel_img}></div>
      </div>}
    </div>
  )
}
