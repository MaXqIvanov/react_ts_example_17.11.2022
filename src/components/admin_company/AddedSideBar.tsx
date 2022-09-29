import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../scss/AdminCompany.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/taskSlice';

export const AddedSideBar = ({setIsAddedSideBar, isadded_sidebar}:any) => {
    const [position, setPosition] = useState<string>("")
    const [name_position, setNamePosition] = useState<string>("")
    const [comment, setComment] = useState<string>("")
  return (
    <>
        <div className={styles.user_side_menu}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsAddedSideBar(!isadded_sidebar)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div>
            <div className={styles.text_field_block}>
                <TextField
                    value={name_position}
                    className={`${styles.text_field}`}
                    onChange={(e:any)=> setNamePosition(e.target.value)}
                    label="Название"
                    InputProps={{
                    type: 'string',
                    }}
                />
                <div className={`${styles.select_position_wrapper}`}>
                <FormControl fullWidth className={`${styles.select_position}`}>
                    <InputLabel id="select_simple" className={`${styles.input_label}`}>Должность</InputLabel>
                    <Select
                    className='custom_select'
                    labelId="select_simple"
                    id="select_simple"
                    value={position}
                    label="Статус"
                    onChange={(e:any)=> setPosition(e.target.value)}
                    >
                    <MenuItem value={10}>Менеджер отдел продаж</MenuItem>
                    <MenuItem value={20}>Менеджер отдела продаж2</MenuItem>
                    <MenuItem value={30}>Менеджер отдела продаж3</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <FormControl fullWidth className={`${styles.select_position}`}>
                  <label className={comment && comment.length > 0 ? `${styles.visible_label}` : `${styles.not_visible_label}`}>Комментарий</label>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={8}
                    id="text_area"
                    placeholder="Комментарий"
                    className={`text_area`}
                    value={comment}
                    onChange={(e:any)=> setComment(e.target.value)}
                    style={{ width: '99%', marginTop: '30px' }}
                  />
                </FormControl>
            </div>
            <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div className={styles.btn_cancel_side_bar}><span>ОТМЕНА</span></div>
                  <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
                </div>
            </div>
          </div>
        </div>
        <div onClick={()=> setIsAddedSideBar(false)} className={styles.user_side_menu_plug}></div>
      </>
  )
}