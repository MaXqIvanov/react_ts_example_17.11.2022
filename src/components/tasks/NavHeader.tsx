import React, { useState } from 'react'
import 'rc-calendar/assets/index.css';
import styles from '../../scss/Task.module.scss'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/ru_RU';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/ru';
// import calendar_img from '../../'

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
    const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className={styles.nav_header}>
        <div className={styles.nav_header_btn}>
            {days && days.map((elem:any)=>
            <div onClick={()=> setCurrentDays(elem.id)} key={elem.id} className={ elem.id !== current_days ? styles.current_btn : styles.current_btn_active}>
                <span>{elem.title}</span>
            </div>)}
            <div className={styles.nav_header_time}>Загрузка по норме 15 ч.</div>
        </div>
        <div className={styles.nav_header_calendar}>
            <div className={styles.calendar_body}>
                <div style={{backgroundImage: `url(${})`}} className={styles.calendar_img}></div>
                <div>05.09.2022</div>
            </div>
           {isVisible && <RangeCalendar /> }
        </div>
    </div>
  )
}
