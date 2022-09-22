import React, { useState } from 'react'
import 'rc-calendar/assets/index.css';
import styles from '../../scss/Task.module.scss'
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/ru_RU';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/ru';


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
            <RangeCalendar />
        </div>
    </div>
  )
}
