import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../scss/CompanyPosition.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/taskSlice';
import img_user from '../../assets/img_user.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const SideBar = ({setIsVisibleSideBar, isvisible_sidebaer}:any) => {
  const [position, setPosition] = useState<any>(10)
  const {user} = useSelector((state:RootState)=> state.auth)
  return (
    <>
        <div id={'company_position_sidebar'} className={`${styles.user_side_menu}`}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsVisibleSideBar(!isvisible_sidebaer)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div>
            <div className={styles.text_field_block}>
              <TextField
                    value={'Выбранное название'}
                    className={`${styles.text_field}`}
                    label="Название"
                    InputProps={{
                    type: 'string',
                    }}
                />
                <div className={`${styles.select_position_wrapper}`}>
                <FormControl fullWidth className={`${styles.select_emp} select_emp`}>
                    <InputLabel id="select_simple" className={`${styles.input_label}`}>Сотрудник</InputLabel>
                    <Select
                      className='custom_select'
                      labelId="select_simple"
                      id="select_simple"
                      defaultValue={position}
                      value={10}
                      label="Статус"
                      onChange={(e:any)=> setPosition(e.target.value)}
                    >
                    <MenuItem value={10}><div style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}} className={styles.img_user_company_position}></div>Иванов Иван Иванович</MenuItem>
                    <MenuItem value={20}><div style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}} className={styles.img_user_company_position}></div>Иванов Иван Иванович2</MenuItem>
                    <MenuItem value={30}><div style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}} className={styles.img_user_company_position}></div>Иванов Иван Иванович3</MenuItem>
                    </Select>
                </FormControl>
                </div>
            </div>
            <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div className={styles.btn_delete_side_bar}><span>УДАЛИТЬ</span></div>
                  <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
                </div>
            </div>
          </div>
        </div>
        <div onClick={()=> setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
      </>
  )
}
