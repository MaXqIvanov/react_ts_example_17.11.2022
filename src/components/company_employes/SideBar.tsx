import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../../scss/CompanyEmployes.module.scss';
import close_btn from '../../assets/close_btn.svg';
import info_btn from '../../assets/task/akar-icons_info.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import active_img from '../../assets/company/active_img.svg';
import executor_img from '../../assets/company/executor_img.svg';
import analitic_img from '../../assets/company/analitic_img.svg';
import controller_img from '../../assets/company/controller_img.svg';
import camera_img from '../../assets/camera_img.svg';
import useClickOutSide from '../../hooks/useClickOutSide';
import { getPositionCompanyAll } from '../../store/positionSlice';
import { useAppDispatch } from '../../hooks/redux';
import { changeEmployesCompany } from '../../store/employesSlice';
import InputMask from 'react-input-mask';

export const SideBar = ({ setIsVisibleSideBar, isvisible_sidebaer }: any) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [image, setImage] = useState<any>(null);
  const [image_preview, setImagePriview] = useState<any>(null);
  const [password, setPassword] = useState<string>('');
  const [repeat_password, setRepeatPassword] = useState<string>('');
  const { user } = useSelector((state: RootState) => state.auth);
  const [status, setStatus] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isExecutor, setIsExecutor] = useState(false);
  const [isController, setIsController] = useState(false);
  const [isAnalitik, setIsAnalitik] = useState(false);
  const [phoneHolder, setPhoneHolder] = useState<string>('');
  const [position, setPosition] = useState<any>({});
  const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false);
  const select = useClickOutSide(() => {
    setIsVisibleSelect(false);
  });
  const [isVisibleLabel, setIsVisibleLabel] = useState<boolean>(false);
  const { position_all_admin, employes_company_current } = useSelector(
    (state: RootState) => state.employes
  );
  const { position_company_all } = useSelector((state: RootState) => state.position);
  const handleCapture = ({ target }: any) => {
    const preview: any = document.querySelector('img');
    let file: any = document?.querySelector('input[type=file]');
    file = file.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      preview.src = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
    setImage(target.files[0]);
    console.log(target.files[0]);

    setImagePriview(preview);
  };

  useEffect(() => {
    dispatch(getPositionCompanyAll({ search: '' }));
  }, []);
  useEffect(() => {
    setName(employes_company_current._user.name);
    setIsActive(employes_company_current.is_active);
    setIsExecutor(employes_company_current.is_executor);
    setIsController(employes_company_current.is_controller);
    setIsAnalitik(employes_company_current.is_analyst);
    setPhoneHolder(employes_company_current._user.phone);
    setPosition({ name: employes_company_current._position });

    if (employes_company_current._user.avatar) {
      setImage(employes_company_current._user.avatar);
      setImagePriview(employes_company_current._user.avatar);
    }
  }, [employes_company_current]);

  return (
    <>
      <div id={'sidebar_input'} className={styles.user_side_menu}>
        <div className={styles.user_side_menu_wrapper}>
          <div
            onClick={() => setIsVisibleSideBar(!isvisible_sidebaer)}
            style={{ backgroundImage: `url(${close_btn})` }}
            className={styles.close_user_side_menu_btn}
          ></div>
          <div className={styles.side_menu_header}>
            <span>Сотрудник</span>
          </div>
          <div className={styles.group_body}>
            <Button
              style={{
                marginTop: '20px',
                backgroundImage: `url(${image_preview ? image_preview.src : ''})`,
              }}
              component="label"
              className={styles.header_user_not_img}
            >
              <input type="file" hidden onChange={handleCapture} />
              <img
                className={`${image_preview ? 'image_logo' : 'image_not_logo'}`}
                src={image_preview ? image_preview : ''}
                alt={undefined}
              ></img>
              {/* <div
              className={styles.header_user_not_img}> */}
              {!image_preview && (
                <span>
                  {(name?.split(' ')[0]?.split('')[0]
                    ? name?.split(' ')[0]?.split('')[0]?.toUpperCase()
                    : '') +
                    (name?.split(' ')[1]?.split('')[0]
                      ? name?.split(' ')[1]?.split('')[0]?.toUpperCase()
                      : '')}
                </span>
              )}
              {/* </div> */}
            </Button>
            <div
              style={{ marginTop: '10px', width: 'calc(100% - 20px)' }}
              className={'wrapper_input_width_label'}
            >
              <div className={'label'}>Имя</div>
              <input onChange={(e) => setName(e.target.value)} value={name} className={'input'} />
            </div>
            <div
              style={{ marginTop: '10px', width: 'calc(100% - 20px)' }}
              className={'wrapper_input_width_label'}
            >
              <div className={'label'}>Номер телефона</div>
              <InputMask
                onClick={() => setIsVisibleLabel(false)}
                onBlur={() => setIsVisibleLabel(false)}
                mask="+7 (999) 999-99-99"
                value={phoneHolder}
                onChange={(e: any) => {
                  setPhoneHolder(e.target.value);
                }}
                required
                placeholder={''}
                className={`${styles.input_phone}`}
              />
            </div>
            <div
              style={{ marginTop: '30px', width: 'calc(100% - 20px)' }}
              onClick={() => setIsVisibleSelect(!isVisibleSelect)}
              className={'custom_select_wrapper_admin wrapper_input_width_label'}
            >
              <div style={{ marginTop: '-28px', marginLeft: '-10px' }} className={'label'}>
                Должность
              </div>
              <div style={{ marginTop: '15px' }} className={'select_body'}>
                {position.name ? position.name : ''}
              </div>
              <div className={'select_arrow'}></div>
              {isVisibleSelect && (
                <div ref={select} className={'select_additional'}>
                  {position_company_all?.length > 0 &&
                    position_company_all.map((elem: any) => (
                      <div
                        key={elem.id}
                        onClick={() => setPosition(elem)}
                        className={'position_current'}
                      >
                        <span>{elem.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div
              style={{ marginTop: '10px', width: 'calc(100% - 20px)' }}
              className={'wrapper_input_width_label'}
            >
              <div className={'label'}>Новый пароль</div>
              <input
                type={'password'}
                placeholder=""
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div
              style={{ marginTop: '10px', width: 'calc(100% - 20px)' }}
              className={'wrapper_input_width_label'}
            >
              <div className={'label'}>Повторить пароль</div>
              <input
                type={'password'}
                placeholder=""
                value={repeat_password}
                onChange={(e: any) => setRepeatPassword(e.target.value)}
              />
            </div>
            <div
              style={{ width: 'calc(100% - 30px)' }}
              className={`${styles.group_for_checked} custom_switch`}
            >
              <div className={styles.title_checked}>Активный</div>
              <input
                id="s2d_active"
                type="checkbox"
                className="switch"
                onChange={(e: any) => setIsActive(e.target.checked)}
                checked={isActive}
              />
            </div>
            <div
              style={{ width: 'calc(100% - 30px)' }}
              className={`${styles.group_for_checked} custom_switch`}
            >
              <div className={styles.title_checked}>Исполнитель</div>
              <input
                id="s2d_executor"
                type="checkbox"
                className="switch"
                onChange={(e: any) => setIsExecutor(e.target.checked)}
                checked={isExecutor}
              />
            </div>
            <div
              style={{ width: 'calc(100% - 30px)' }}
              className={`${styles.group_for_checked} custom_switch`}
            >
              <div className={styles.title_checked}>Контроллер</div>
              <input
                id="s2d_controller"
                type="checkbox"
                className="switch"
                onChange={(e: any) => setIsController(e.target.checked)}
                checked={isController}
              />
            </div>
            <div
              style={{ width: 'calc(100% - 30px)' }}
              className={`${styles.group_for_checked} custom_switch`}
            >
              <div className={styles.title_checked}>Аналитик</div>
              <input
                id="s2d_analitik"
                type="checkbox"
                className="switch"
                onChange={(e: any) => setIsAnalitik(e.target.checked)}
                checked={isAnalitik}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                width: '100%',
                marginRight: '10px',
                marginBottom: '0px',
                marginTop: '30px',
              }}
              className={'custom_btn_wrapper'}
            >
              <div
                onClick={() => setIsVisibleSideBar(!isvisible_sidebaer)}
                className={'btn_cancel'}
              >
                <span>Отмена</span>
              </div>
              <div
                onClick={() =>
                  dispatch(
                    changeEmployesCompany({
                      phone: phoneHolder,
                      name: name,
                      password: password,
                      position: position.id,
                      is_active: isActive,
                      is_executor: isExecutor,
                      is_controller: isController,
                      is_analyst: isAnalitik,
                      avatar: image?.name ? image : undefined,
                      setIsVisibleSideBar: setIsVisibleSideBar,
                    })
                  )
                }
                className={'btn_complete'}
              >
                <span>Соханить</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => setIsVisibleSideBar(false)} className={styles.user_side_menu_plug}></div>
    </>
  );
};
