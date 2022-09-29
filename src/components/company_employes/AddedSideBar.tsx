import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../scss/CompanyEmployes.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import active_img from '../../assets/company/active_img.svg'
import executor_img from '../../assets/company/executor_img.svg'
import analitic_img from '../../assets/company/analitic_img.svg'
import controller_img from '../../assets/company/controller_img.svg'
import InputMask from 'react-input-mask';
import camera_img from '../../assets/camera_img.svg';

export const AddedSideBar = ({setIsAddedSideBar, isadded_sidebar}:any) => {
  const {user} = useSelector((state:RootState)=> state.auth)
  const [status, setStatus] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isExecutor, setIsExecutor] = useState(false);
  const [isController, setIsController] = useState(false);
  const [isAnalitik, setIsAnalitik] = useState(false)
  const [phoneHolder, setPhoneHolder] = useState<string>('')

  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false)
  return (
    <>
    <div className={styles.user_side_menu}>
      <div className={styles.user_side_menu_wrapper}>
        <div onClick={()=> setIsAddedSideBar(!isadded_sidebar)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
        <div className={styles.group_body}>
          <div className={styles.group_img_user}>
            <div style={{backgroundImage: `url(${user.profile_img})`}} className={styles.img_user}></div>
            <div style={{backgroundImage: `url(${camera_img})`}} className={styles.img_user_added_photo}></div>
          </div>
          <div className={styles.text_field_block}>
            <div className={`${styles.select_position_wrapper}`}>
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
              <div className={`${styles.group_for_checked} custom_switch`}>
                <div  className={styles.title_checked}><div style={{backgroundImage: `url(${active_img})`}} className={styles.switch_img}></div>Активный</div>
                <input id="s2d_active" type="checkbox" className="switch"
                onChange={(e:any)=> setIsActive(e.target.checked)} checked={isActive} />
              </div>
              <div className={`${styles.group_for_checked} custom_switch`}>
                <div  className={styles.title_checked}><div style={{backgroundImage: `url(${executor_img})`}} className={styles.switch_img}></div>Исполнитель</div>
                <input id="s2d_executor" type="checkbox" className="switch"
                onChange={(e:any)=> setIsExecutor(e.target.checked)} checked={isExecutor} />
              </div>
              <div className={`${styles.group_for_checked} custom_switch`}>
                <div  className={styles.title_checked}><div style={{backgroundImage: `url(${controller_img})`}} className={styles.switch_img}></div>Контроллер</div>
                <input id="s2d_controller" type="checkbox" className="switch"
                onChange={(e:any)=> setIsController(e.target.checked)} checked={isController} />
              </div>
              <div className={`${styles.group_for_checked} custom_switch`}>
                <div  className={styles.title_checked}><div style={{backgroundImage: `url(${analitic_img})`}} className={styles.switch_img}></div>Аналитик</div>
                <input id="s2d_analitik" type="checkbox" className="switch"
                onChange={(e:any)=> setIsAnalitik(e.target.checked)} checked={isAnalitik} />
              </div>
          </div>
          </div>
        </div>
        <div className={styles.group_btn_side_bar}>
            <div className={styles.group_btn_side_bar_save_close}>
              <div className={styles.btn_cancel_side_bar}>УДАЛИТЬ</div>
              <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
            </div>
        </div>
      </div>
    </div>
    <div onClick={()=> setIsAddedSideBar(false)} className={styles.user_side_menu_plug}></div>
  </>
  )
}
