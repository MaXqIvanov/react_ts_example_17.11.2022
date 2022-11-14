import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
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
import { Editor } from '@tinymce/tinymce-react';


const myTheme = createTheme({
  // Set up your custom MUI theme here
})
Object.assign(myTheme, {
  overrides: {
      MUIRichTextEditor: {
          root: {
            border: '0.6px solid #9CB9C5',
            marginTop: 30,
            paddingLeft: '10px',
            paddingRight: '10px',
          },
          editor: {
            paddingTop: '30px',
            paddingLeft: '10px',
            paddingRight: '10px'
          }
      }
  }
})

export const CreateSideBar = () => {
  const dispatch = useAppDispatch()
  const [date_start_task, setDateStartTask] = useState('')
  const [period_task_current, setPeriosTaskCurrent] = useState({id: 1, title: 'Ежедневно'})
  const [is_visible_period, setIsVisiblePeriod] = useState<boolean>(false)
  const [period_select, setPeriodSelect] = useState([
    {
      id: 1,
      title: 'Ежедневно'
    },
    {
      id: 2,
      title: 'Еженедельно (вторник)'
    },
    {
      id: 3,
      title: 'Ежемесячно (первый вторник)'
    },
    {
      id: 4,
      title: 'Ежемесячно (выбранная дата)'
    },
    {
      id: 5,
      title: 'Ежегодно (16.08)'
    },
    {
      id: 6,
      title: 'По будням (с понедельника по пятницу'
    },
    {
      id: 7,
      title: 'Не повторять'
    },
    {
      id: 999,
      title: 'Другое...'
    }
  ])
  const [report, setReport] = useState('')
  const handleChange = (newValue:any) => {
    setDateStartTask(newValue);
  };

  const editorRef:any = useRef(null);

  

  return (
    <>
        <div className={`${styles.user_side_menu_create} user_side_menu`}>
          <div className={styles.user_side_menu_create_wrapper}>
            <div onClick={()=> dispatch(changeVisibleSideBar())} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_create_btn}></div>
            <div className={styles.side_menu_title}><span>Задача</span></div>
            {/* <div style={{backgroundImage: `url(${info_btn})`}} className={styles.info_user_side_menu_btn}></div> */}
            <div className={styles.text_field_block_create}>
                {/* <TextField className={`${styles.current_task_field} current_task_field`} id="standard-basic" label="Задача" variant="standard" /> */}
                <div className={'wrapper_input_width_label'}>
                  <div className={'label'}>Название</div>
                  <input className={'input'}/>
                </div>
                <div style={{marginTop: '29px'}} className={'custom_select_wrapper_create'}>
                  <div className='label'>Периодичность</div>
                  <div onClick={()=> setIsVisiblePeriod(!is_visible_period)} className={'select_body_create'}>{period_task_current.title}</div>
                  <div className={'select_arrow_create'}></div>
                  {is_visible_period &&
                    <div className={'select_additional_create'}>
                      {period_select.map((elem:any)=> 
                        <div key={elem.id} onClick={()=>{
                          setPeriosTaskCurrent(elem)
                          setIsVisiblePeriod(false)
                        }} className={'select_one'}><span>{elem.title}</span></div>)}
                    </div>
                  }
                </div>
                <div style={{marginTop: '10px'}} className={'wrapper_input_width_label'}>
                  <div className={'label'}>Начало до</div>
                  <input placeholder='00:00' className={'input'}/>
                </div>
                <div style={{marginTop: '10px'}} className={'wrapper_input_width_label'}>
                  <div className={'label'}>Отчет/Артефакт</div>
                  <textarea rows={3}></textarea>
                </div>
                <div style={{marginTop: '10px', width: '142px'}} className={'wrapper_input_width_label'}>
                  <div className={'label'}>Начало до</div>
                  <input className={'input'}/>
                </div>
                <Editor apiKey='uhkrpnl1dfs4w8nt8a22oug4eap1yhb657nso942f8slxhu6' onInit={(evt, editor) => editorRef.current = editor}
                  initialValue="<p>Описание задачи</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'link image',
                      'table paste'
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }} />
                {/* <ThemeProvider theme={myTheme}>
                  <MUIRichTextEditor onChange={(e)=> console.log(e)} label="Описание задачи"/>
                </ThemeProvider> */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className={`${styles.date_picker_desctop} ${styles.text_field}`}
                    label="Дата старта задачи"
                    inputFormat="MM/DD/YYYY"
                    value={date_start_task}
                    onChange={handleChange}
                    renderInput={(params:any) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}
                {/* <div className={`${styles.select_position_wrapper}`}>
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
                </div> */}
                {/* <TextField
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
                    minRows={3}
                    id="text_area"
                    placeholder="Отчёт/артефакт"
                    className={`text_area ${styles.text_field}`}
                    onChange={(e:any)=> setReport(e.target.value)}
                    value={report}
                    style={{ width: '97%', marginTop: '30px' }}
                  />
                </FormControl> */}
                
                
            </div>
            <div className={styles.group_btn_side_bar}>
                <div className={styles.group_btn_side_bar_save_close}>
                  <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.btn_cancel_side_bar}><span>ЗАКРЫТЬ</span></div>
                  <div onClick={()=> console.log(editorRef.current.getContent())} className={styles.btn_save_side_bar}><span>ЗАВЕРШИТЬ</span></div>
                </div>
            </div>
          </div>
        </div>
        <div onClick={()=> dispatch(changeVisibleSideBar())} className={styles.user_side_menu_plug}></div>
      </>
  )
}
