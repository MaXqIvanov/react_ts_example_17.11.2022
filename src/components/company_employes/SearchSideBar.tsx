import React, { useState } from 'react'
import styles from '../../scss/CompanyEmployes.module.scss'
import close_btn from '../../assets/close_btn.svg';
import InputMask from 'react-input-mask';

export const SearchSideBar = ({setIsSearchSideBar, issearch_sidebar, setIsAddedSideBar}:any) => {
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false)
  const [phoneHolder, setPhoneHolder] = useState<string>('')
  return (
    <>
    <div className={styles.user_side_menu}>
      <div className={styles.user_side_menu_wrapper}>
        <div onClick={()=> setIsSearchSideBar(!issearch_sidebar)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
        <div className={styles.group_body}>
          <div className={styles.group_img_user}>
          </div>
          <div className={styles.text_field_block}>
            <div className={styles.search_side_bar_title}>
              Введите номер телефона сотрудника
            </div>
            <div className={styles.group_input_mask}>
              <label className={phoneHolder && phoneHolder!.match(/[0-9]/g)!.length > 0 ? `${styles.visible_label}` : ''}>Номер телефона</label>
              <InputMask onClick={()=> setIsVisibleLabel(true)} onBlur={()=> setIsVisibleLabel(false)} mask="+7(999)999-99-99" value={phoneHolder} onChange={((e:any) => {
                  setPhoneHolder(e.target.value)
              })} required placeholder={'Номер телефона'} className={`form-input ${styles.input_phone} ${styles.text_field}`} />
            </div>
          </div>
        </div>
        <div className={styles.group_btn_side_bar}>
            <div className={styles.group_btn_side_bar_save_close}>
              <div onClick={()=> setIsSearchSideBar(false)} className={styles.btn_cancel_side_bar}>ОТМЕНА</div>
              <div onClick={()=> setIsAddedSideBar(true)} className={styles.btn_save_side_bar}><span>ПРОДОЛЖИТЬ</span></div>
            </div>
        </div>
      </div>
    </div>
    <div onClick={()=> setIsSearchSideBar(false)} className={styles.user_side_menu_plug}></div>
  </>
  )
}
