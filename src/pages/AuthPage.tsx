import React, { useState } from 'react'
import styles from '../scss/Auth.module.scss'
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

export const AuthPage = () => {
  const [user_phone, setUserPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<string>('')
  const auth = ()=>{
    console.log(user_phone);
    if(user_phone?.includes('_')){  
      setErrors('Телефон введён не корректно')
      return
    }
    if(password.length <= 3){
      setErrors('Пароль должен содержать минимум 3 символа')
      return
    }
    setErrors('')
    alert('Вход в систему прошёл успешно')
  }
  return (
    <div className={styles.auth}>
      <div className={styles.auth_wrapper}>
        <div className={styles.auth_title}>WorkTracker</div>
        <InputMask mask="+7(999)999-99-99" value={user_phone} onChange={((e: any) => {
          setUserPhone(e.target.value)
        })} required placeholder={'+7 (___) ___-__-__'} className={styles.phone_input} />
        <input onChange={((e:any)=> {
          setPassword(e.target.value)
        })} placeholder='Пароль'/>
        <div onClick={()=> auth()} className={styles.auth_btn}><span>Войти</span></div>
        {errors ? <div className={styles.errors}>{errors}</div>
        :<div className={styles.errors}></div>}
      </div>
    </div>
  )
}
