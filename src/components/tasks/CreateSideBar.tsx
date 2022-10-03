import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from '../../scss/Task.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useAppDispatch } from '../../hooks/redux';
import { changeVisibleSideBar } from '../../store/taskSlice';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-text-editor'

const myTheme = createTheme({
  // Set up your custom MUI theme here
})

export const CreateSideBar = () => {
  const dispatch = useAppDispatch()
  const [date_start_task, setDateStartTask] = useState('')
  const [period_task, setPeriosTask] = useState('')
  const [report, setReport] = useState('')
  const handleChange = (newValue:any) => {
    setDateStartTask(newValue);
  };
  return (
    <>
        <div className={`${styles.user_side_menu} user_side_menu`}>
          <div className={styles.user_side_menu_wrapper}>
            <div onClick={()=> dispatch(changeVisibleSideBar())} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
            <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div>
            <div className={styles.text_field_block}>
                <TextField className={`${styles.current_task_field} current_task_field`} id="standard-basic" label="Задача" variant="standard" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className={`${styles.date_picker_desctop} ${styles.text_field}`}
                    label="Дата старта задачи"
                    inputFormat="MM/DD/YYYY"
                    value={date_start_task}
                    onChange={handleChange}
                    renderInput={(params:any) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <div className={`${styles.select_position_wrapper}`}>
                  <FormControl fullWidth className={styles.select_position}>
                    <InputLabel id="demo-simple-select-label" className={styles.input_label}>Переодичность</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={period_task}
                      label="Переодичность"
                      className='custom_select'
                      onChange={(e:any)=>setPeriosTask(e.target.value)}
                    >
                      <MenuItem value={10}>Кажд. 2 нед. -вторник, пятница, до 02.12.2022</MenuItem>
                      <MenuItem value={20}>Программист</MenuItem>
                      <MenuItem value={30}>Админ</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  value={'18:00'}
                  className={`${styles.text_field}`}
                  label="Крайнее время выполнения"
                  InputProps={{
                    type: 'string',
                  }}
                />
                <TextField
                  value={'10'}
                  className={`${styles.text_field}`}
                  label="Норма (минуты)"
                  InputProps={{
                    type: 'string',
                  }}
                />
                 <FormControl fullWidth className={`${styles.select_position}`}>
                  <label className={report && report.length > 0 ? `${styles.visible_label}` : `${styles.not_visible_label}`}>Отчёт/артефакт</label>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    id="text_area"
                    placeholder="Отчёт/артефакт"
                    className={`text_area ${styles.text_field}`}
                    onChange={(e:any)=> setReport(e.target.value)}
                    value={report}
                    style={{ width: '97%', marginTop: '30px' }}
                  />
                </FormControl>
                
                <ThemeProvider theme={myTheme}>
                  <MUIRichTextEditor label="Описание задачи" />
                </ThemeProvider>
                
            </div>
            <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div className={styles.btn_cancel_side_bar}><span>ЗАКРЫТЬ</span></div>
                  <div className={styles.btn_save_side_bar}><span>ЗАВЕРШИТЬ</span></div>
                </div>
            </div>
          </div>
        </div>
        <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.user_side_menu_plug}></div>
      </>
  )
}
