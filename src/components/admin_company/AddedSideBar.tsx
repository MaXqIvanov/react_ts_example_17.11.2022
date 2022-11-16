import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '../../scss/AdminCompany.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/taskSlice';
import img_user from '../../assets/img_user.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useClickOutSide from '../../hooks/useClickOutSide';
import { createCompanyAdmin, getCompanyEmployes } from '../../store/companySlice';

export const AddedSideBar = ({setIsAddedSideBar, isadded_sidebar}:any) => {
    const dispatch = useAppDispatch()
    const [admin, setAdmin] = useState<any>({})
    const [name, setName] = useState<string>("")
    const [comment, setComment] = useState<string>("")
    const {user} = useSelector((state:RootState)=> state.auth)
    const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false)
    const {company_employes} = useSelector((state: RootState)=> state.company)
    let select = useClickOutSide(()=> {
      setIsVisibleSelect(false)
    })

    useEffect(() => {
      dispatch(getCompanyEmployes(''))
    }, [])
    

  return (
    <>
        <div className={styles.user_side_menu}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> setIsAddedSideBar(!isadded_sidebar)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
              <div className={styles.side_menu_header}>
                <span>Компания</span>
              </div>
              <div className={styles.side_menu_body}>
                <div style={{marginTop: '0px'}} className={'wrapper_input_percent'}>
                  <input placeholder='Наименование компании' value={name} onChange={(e:any)=> setName(e.target.value)}/>
                </div>
                <div style={{marginTop: '10px'}} onClick={()=> setIsVisibleSelect(!isVisibleSelect)} className={'custom_select_wrapper_admin'}>
                  <div className={'select_body'}>{admin.name ? admin.name : 'Администратор'}</div>
                  <div className={'select_arrow'}></div>
                  {isVisibleSelect &&
                    <div ref={select} style={{maxHeight: '65px'}} className={'select_additional'}>
                      {company_employes?.length > 0 &&
                      company_employes.map((elem:any)=> <div onClick={()=> setAdmin(elem)} className={'position_current'}>
                        <span>{elem.name}</span>
                      </div>)}
                    </div>
                  }
                </div>
              </div>
              <div style={{display: 'flex' , justifyContent: 'right', width: '100%', marginRight: '30px', marginBottom: '20px'}} className={'custom_btn_wrapper_position'}>
                <div onClick={()=> setIsAddedSideBar(!isadded_sidebar)} className={'btn_cancel'}><span>Отмена</span></div>
                <div onClick={()=> dispatch(createCompanyAdmin({
                  // phone: phoneHolder,
                  name: name,
                  admin: admin.id,
                  // password: password,
                  // company: position.id,
                  setIsAddedSideBar: setIsAddedSideBar
                }))} className={'btn_complete'}><span>Соханить</span></div>
            </div>
            {/* <div className={styles.text_field_block}> */}
                {/* <TextField
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
                    <InputLabel id="select_simple" className={`${styles.input_label}`}>Администратор</InputLabel>
                    <Select
                    className='custom_select'
                    labelId="select_simple"
                    id="select_simple"
                    value={position}
                    label="Статус"
                    onChange={(e:any)=> setPosition(e.target.value)}
                    >
                    <MenuItem value={10}><div style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}} className={styles.img_user_company_position}></div>Иванов Иван Иванович</MenuItem>
                    <MenuItem value={20}><div style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}} className={styles.img_user_company_position}></div>Иванов Иван Иванович2</MenuItem>
                    <MenuItem value={30}><div style={{backgroundImage: user.profile_img ? `url(${user.profile_img})` : `url(${img_user})`}} className={styles.img_user_company_position}></div>Иванов Иван Иванович3</MenuItem>
                    </Select>
                </FormControl>
                </div> */}
                {/* <FormControl fullWidth className={`${styles.select_position}`}>
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
                </FormControl> */}
            </div>
            {/* <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div className={styles.btn_cancel_side_bar}><span>ОТМЕНА</span></div>
                  <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
                </div>
            </div> */}
          {/* </div> */}
        </div>
        <div onClick={()=> setIsAddedSideBar(false)} className={styles.user_side_menu_plug}></div>
      </>
  )
}
