import React from 'react';
import styles from '../../scss/ChooseWorkCompany.module.scss';
import controller from '../../assets/choose_company/controller.svg';
import analyst from '../../assets/choose_company/analyst.svg';
import executor from '../../assets/choose_company/executor.svg';

export const OneCompanyComponent = ({ elem }: any) => {
  return (
    <div className={styles.one_company}>
      <div className={styles.one_company_wrapper}>
        <div className={styles.name_company}>{elem.name_company}</div>
        <div className={styles.one_company_list_root}>
          {elem.company_root &&
            elem.company_root.map((elem: any) => (
              <div className={styles.current_root}>
                <div
                  style={{
                    backgroundImage: `url(${
                      elem.toLowerCase() === 'контроллёр'
                        ? controller
                        : elem.toLowerCase() === 'аналитик'
                        ? analyst
                        : executor
                    })`,
                  }}
                  className={styles.current_root_img}
                ></div>
                <div className={styles.current_root_title}>{elem}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
