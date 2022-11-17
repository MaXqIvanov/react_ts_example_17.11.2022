import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '../../scss/CompanyEmployes.module.scss'
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import active_img from '../../assets/company/active_img.svg'
import executor_img from '../../assets/company/executor_img.svg'
import analitic_img from '../../assets/company/analitic_img.svg'
import controller_img from '../../assets/company/controller_img.svg'
import InputMask from 'react-input-mask';
import camera_img from '../../assets/camera_img.svg';
import useClickOutSide from '../../hooks/useClickOutSide';
import { useAppDispatch } from '../../hooks/redux';
import { getPositionCompanyAll } from '../../store/positionSlice';

export const AddedSideBar = ({setIsAddedSideBar, isadded_sidebar}:any) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [image, setImage] = useState<any>(null)
  const [image_preview, setImagePriview] = useState<any>(null)
  const [password, setPassword] = useState<string>("")
  const [repeat_password, setRepeatPassword] = useState<string>("")
  const {user} = useSelector((state:RootState)=> state.auth)
  const [status, setStatus] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isExecutor, setIsExecutor] = useState(false);
  const [isController, setIsController] = useState(false);
  const [isAnalitik, setIsAnalitik] = useState(false)
  const [phoneHolder, setPhoneHolder] = useState<string>('')
  const [position, setPosition] = useState<any>({})
  const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false)
  let select = useClickOutSide(()=> {
    setIsVisibleSelect(false)
  })
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false)
  const {position_all_admin} = useSelector((state: RootState)=> state.employes)
  const {position_company_all} = useSelector((state: RootState)=> state.position)
  const handleCapture = ({ target }: any) => {

    var preview:any = document.querySelector('img');
    var file:any = document?.querySelector('input[type=file]')
    file = file.files[0];
    var reader  = new FileReader();
    reader.onloadend = function () {
      preview.src = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
    setImage(target.files[0])
    setImagePriview(preview)
  };

  useEffect(() => {
    dispatch(getPositionCompanyAll({search: ''}))
  }, [])

  return (
    <>
    <div id={'sidebar_input'} className={styles.user_side_menu_added}>
      <div className={styles.user_side_menu_wrapper}>
        <div onClick={()=> setIsAddedSideBar(!isadded_sidebar)} style={{backgroundImage: `url(${close_btn})`}} className={styles.close_user_side_menu_btn}></div>
        <div className={styles.side_menu_header}><span>Сотрудник</span></div>
        <div className={styles.group_body}> 
          <Button style={{marginTop: '20px', backgroundImage: `url(${image_preview ? image_preview.src : ''})`}} component="label" className={styles.header_user_not_img}>
            <input
              type="file"
              hidden
              onChange={handleCapture}
            />
            <img className={`${image_preview ? 'image_logo' : 'image_not_logo'}`} src={image_preview ? image_preview : ''} alt={undefined}></img>
            {/* <div
              className={styles.header_user_not_img}> */}
              {!image_preview &&<span>{(name?.split(' ')[0]?.split('')[0] ? name?.split(' ')[0]?.split('')[0]?.toUpperCase() : '') + (name?.split(' ')[1]?.split('')[0] ? name?.split(' ')[1]?.split('')[0]?.toUpperCase() : '')}</span>}
            {/* </div> */}
          </Button>
          <div style={{marginTop: '10px', width: 'calc(100% - 20px)'}} className={'wrapper_input_width_label'}>
            <div className={'label'}>Имя</div>
            <input onChange={(e) => setName(e.target.value)} value={name} className={'input'}/>
          </div>
          <div style={{marginTop: '10px', width: 'calc(100% - 20px)'}} className={'wrapper_input_width_label'}>
            <div className={'label'}>Номер телефона</div>
            <InputMask onClick={()=> setIsVisibleLabel(false)} onBlur={()=> setIsVisibleLabel(false)} mask="+7 (999) 999-99-99" value={phoneHolder} onChange={((e:any) => {
              setPhoneHolder(e.target.value)
            })} required placeholder={''} className={`${styles.input_phone}`} />
          </div>
          <div style={{marginTop: '30px', width: 'calc(100% - 20px)'}} onClick={()=> setIsVisibleSelect(!isVisibleSelect)} className={'custom_select_wrapper_admin wrapper_input_width_label'}>
            <div style={{marginTop: '-28px', marginLeft: '-10px'}} className={'label'}>Должность</div>
            <div style={{marginTop: '15px'}} className={'select_body'}>{position.name ? position.name : ''}</div>
            <div className={'select_arrow'}></div>
            {isVisibleSelect &&
              <div ref={select} className={'select_additional'}>
                {position_company_all?.length > 0 &&
                position_company_all.map((elem:any)=> <div onClick={()=> setPosition(elem)} className={'position_current'}>
                  <span>{elem.name}</span>
                </div>)}
              </div>
            }
          </div>
          <div style={{marginTop: '10px', width: 'calc(100% - 20px)'}} className={'wrapper_input_width_label'}>
            <div className={'label'}>Новый пароль</div>
            <input type={'password'} placeholder='' value={password} onChange={(e:any)=> setPassword(e.target.value)}/>
          </div>
          <div style={{marginTop: '10px', width: 'calc(100% - 20px)'}} className={'wrapper_input_width_label'}>
            <div className={'label'}>Повторить пароль</div>
            <input type={'password'} placeholder='' value={repeat_password} onChange={(e:any)=> setRepeatPassword(e.target.value)}/>
          </div>
           <div style={{width: 'calc(100% - 30px)'}} className={`${styles.group_for_checked} custom_switch`}>
            <div  className={styles.title_checked}>Активный</div>
            <input id="s2d_active" type="checkbox" className="switch"
            onChange={(e:any)=> setIsActive(e.target.checked)} checked={isActive} />
          </div>
          <div style={{width: 'calc(100% - 30px)'}} className={`${styles.group_for_checked} custom_switch`}>
            <div  className={styles.title_checked}>Исполнитель</div>
            <input id="s2d_executor" type="checkbox" className="switch"
            onChange={(e:any)=> setIsExecutor(e.target.checked)} checked={isExecutor} />
          </div>
          <div style={{width: 'calc(100% - 30px)'}} className={`${styles.group_for_checked} custom_switch`}>
            <div  className={styles.title_checked}>Контроллер</div>
            <input id="s2d_controller" type="checkbox" className="switch"
            onChange={(e:any)=> setIsController(e.target.checked)} checked={isController} />
          </div>
          <div style={{width: 'calc(100% - 30px)'}} className={`${styles.group_for_checked} custom_switch`}>
            <div  className={styles.title_checked}>Аналитик</div>
            <input id="s2d_analitik" type="checkbox" className="switch"
            onChange={(e:any)=> setIsAnalitik(e.target.checked)} checked={isAnalitik} />
          </div>
          {/* <div style={{marginTop: '10px', width: '100%'}} className={'wrapper_input_percent'}>
              <input type={'password'} placeholder='Пароль' value={password} onChange={(e:any)=> setPassword(e.target.value)}/>
            </div>
            <div style={{marginTop: '10px', width: '100%'}} className={'wrapper_input_percent'}>
              <input type={'password'} placeholder='Повторите пароль' value={repeat_password} onChange={(e:any)=> setRepeatPassword(e.target.value)}/>
          </div> */}
          {/* <div className={styles.group_img_user}>
            <div style={{backgroundImage: `url(${user.profile_img})`}} className={styles.img_user}></div> */}
            {/* <Button component="label" style={{backgroundImage: `url(${camera_img})`}} className={styles.img_user_added_photo}>
                <input
                  type="file"
                  hidden
                />
            </Button> */}
          {/* </div> */}
          <div className={styles.text_field_block}>
            <div className={`${styles.select_position_wrapper}`}>
                <div className={styles.text_field_block}>
                {/* <TextField
                    className={`${styles.text_field}`}
                    label="ФИО"
                    InputProps={{
                    type: 'string',
                    }}
                />
                <TextField
                    className={`${styles.text_field}`}
                    label="Должность"
                    InputProps={{
                    type: 'string',
                    }}
                />
                <div className={styles.group_input_mask}>
                <label className={phoneHolder && phoneHolder!.match(/[0-9]/g)!.length > 0 ? `${styles.visible_label}` : ''}>Номер телефона</label>
                <InputMask onClick={()=> setIsVisibleLabel(true)} onBlur={()=> setIsVisibleLabel(false)} mask="+7(999)999-99-99" value={phoneHolder} onChange={((e:any) => {
                    setPhoneHolder(e.target.value)
                })} required placeholder={'Номер телефона'} className={`form-input ${styles.input_phone} ${styles.text_field}`} />
                </div> */}
                {/* <TextField
                    className={`${styles.text_field}`}
                    label="Новый пароль"
                    InputProps={{
                    type: 'password',
                    }}
                />
                <TextField
                    className={`${styles.text_field}`}
                    label="Повторить пароль"
                    InputProps={{
                    type: 'password',
                    }}
                /> */}
                </div>
             
          </div>
          </div>
        </div>
        {/* <div className={styles.group_btn_side_bar}>
            <div className={styles.group_btn_side_bar_save_close}>
              <div className={styles.btn_cancel_side_bar}><span>УДАЛИТЬ</span></div>
              <div className={styles.btn_save_side_bar}><span>СОХРАНИТЬ</span></div>
            </div>
        </div> */}
      </div>
    </div>
    <div onClick={()=> setIsAddedSideBar(false)} className={styles.user_side_menu_plug_added}></div>
  </>
  )
}
