import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../scss/Component.module.scss';
import close_btn from '../assets/close_btn.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import camera_img from '../assets/camera_img.svg';
import { TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const Header = () => {
  const router = useNavigate()
  const [isVisibleUserMenu, setIsVisibleUserMenu] = useState<boolean>(false)
  const {user} = useSelector((state:RootState)=> state.auth)
  const [phoneHolder, setPhoneHolder] = useState<string>('')

  // for ui
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false)
  return (
    <div id="header" className={styles.header}>
      <div className={styles.header_wrapper}>
        <div className={styles.group_header}>
          <div onClick={()=> router('/')} className={styles.header_logo}>WorkTracker</div>
          <div onClick={()=> router('/choose_company')} className={styles.header_name_company}>ООО “Купипродай”</div>
        </div>
        <div className={styles.group_header}>
          <div className={styles.header_name}>Иванов Иван Иванович</div>
          <div onClick={()=> setIsVisibleUserMenu(!isVisibleUserMenu)} style={{backgroundImage: `url(https://s3-alpha-sig.figma.com/img/4234/be2b/c2c8992b81f8685935c0441a326a6b93?Expires=1664755200&Signature=HvPEbz7huea8aySsSfYh54vfAkF5ZAJ6h40K0xKprdonRjYbgrwJaAX6KFSLzMrjcS91nP7SAMEaA4Nu9uLqiNInMu3fcqVZU8eqY5yuGwFrgpIKEWq0JRzEVHrsosiYXHD-jI-4eVIUABCtIBa5k6JoZWaO11rI8QqEHaqxifFGe6zlsTPg~7U5fQfiMZu0P8UDWqEsTK89M0d5ZwifmMmjBnEOHBKppBwJc2kXo7k0AeIKHImhLlEfTqp3BBMgXoZmdltSa81n0DgzOC24MhOfwWU~NA2YSEWZ-TYZ2kdOsxF~7cUaWxHuccq7okKQwJtwidG6ggPZYYKZxl6-hw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA)`}}
          className={styles.header_user_img}></div>
        </div>
      </div>
      {isVisibleUserMenu &&
      <>
        <div className={styles.user_side_menu}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsVisibleUserMenu(!isVisibleUserMenu)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            <div className={styles.group_img_user}>
              <div style={{backgroundImage: `url(${user.profile_img})`}} className={styles.img_user}></div>
              <div style={{backgroundImage: `url(${camera_img})`}} className={styles.img_user_added_photo}></div>
            </div>
            <div className={styles.text_field_block}>
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
                  <div className={styles.btn_cancel_side_bar}>ОТМЕНА</div>
                  <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
                </div>
                <div className={styles.btn_quit_account}>ВЫЙТИ</div>
            </div>
          </div>
        </div>
        <div onClick={()=> setIsVisibleUserMenu(false)} className={styles.user_side_menu_plug}></div>
      </>
      }
    </div>
  )
}
