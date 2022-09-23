import React, { useState } from 'react'
import 'rc-calendar/assets/index.css';
import styles from '../../scss/Task.module.scss'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/ru_RU';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/ru';
import calendar_img from '../../assets/clarity_calendar-line.svg'
import btn_left from '../../assets/btn_left.svg'
import btn_right from '../../assets/btn_right.svg'

export const NavHeader = () => {
    const days = [
        {
            id: 1,
            title: 'Все'
        },
        {
            id:2 ,
            title: 'Неделя'
        },
        {
            id: 3,
            title: 'День'
        }
    ]
    // карутины в котлине
    // как работают потоки в рякт нативе
    // как работают потоки в котлине 
    
    const [current_days, setCurrentDays] = useState<number>(1)
    const [value, setValue] = React.useState(null);
    const [current_date, setCurrentDate] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const selectDate = (date:any) => {
        console.log(date);
        console.log(date[0]._d.getDate());
        console.log(date[0]._d.getFullYear());
        console.log(date[0]._d.getMonth());
        let dayOne = date[0]._d.getDate();
        let yearOne = date[0]._d.getFullYear();
        let monthOne = date[0]._d.getMonth();

        let dayTwo = date[1]._d.getDate();
        let yearTwo = date[1]._d.getFullYear();
        let monthTwo = date[1]._d.getMonth();
        setCurrentDate(`${dayOne}.${monthOne}.${yearOne} - ${dayTwo}.${monthTwo}.${yearTwo}`)
        
    }

  return (
    <div className={styles.nav_header}>
        <div className={styles.nav_header_btn}>
            {days && days.map((elem:any, index: number)=>
            <div onClick={()=> setCurrentDays(elem.id)} key={elem.id}
            style={{borderLeft: index == 1 ? '0px solid #9CB9C5' : '1.10983px solid #9CB9C5',
            borderRight: index == 1 ? '0px solid #9CB9C5' : '1.10983px solid #9CB9C5'}}
            className={ elem.id !== current_days ? styles.current_btn : styles.current_btn_active }>
                <span>{elem.title}</span>
            </div>)}
            <div className={styles.nav_header_time}>Загрузка по норме 15 ч.</div>
        </div>
        <div className={styles.nav_header_calendar}>
            <div className={styles.calendar_body}>
                <div onClick={()=> setIsVisible(!isVisible)} style={{backgroundImage: `url(${calendar_img})`}} className={styles.calendar_img}></div>
                <div className={styles.calendar_current_date }>{current_date}</div>
                <div className={styles.group_btn}>
                    <div style={{backgroundImage: `url(${btn_left})`}} className={styles.group_btn_left}></div>
                    <div style={{backgroundImage: `url(${btn_right})`}} className={styles.group_btn_right}></div>
                </div>
            </div>
           {isVisible && <RangeCalendar onSelect={(date:any)=> selectDate(date)}/> }
        </div>
    </div>
  )
}
