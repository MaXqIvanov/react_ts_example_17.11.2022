import React, { useState } from 'react'
import styles from '../scss/Auth.module.scss'
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

export const AuthPage = () => {
  const [user_phone, setUserPhone] = useState()
  const [password, setPassword] = useState()
  return (
    <div className={styles.auth}>
      <div className={styles.auth_wrapper}>
        <div className={styles.auth_title}></div>
        <InputMask mask="+7(999)999-99-99" value={user_phone} onChange={((e: any) => {
          setUserPhone(e.target.value)
        })} required placeholder={'+7 (___) ___-__-__'} className={styles.phone_input} />
        <input onChange={((e:any)=> {
          setPassword(e.target.value)
        })} placeholder='Пароль'/>
      </div>
    </div>
  )
}
