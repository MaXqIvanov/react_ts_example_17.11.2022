import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../scss/Component.module.scss';

export const Header = () => {
  const router = useNavigate()

  return (
    <div id="header" className={styles.header}>
      <div className={styles.header_wrapper}>
        <div className={styles.group_header}>
          <div onClick={()=> router('/')} className={styles.header_logo}>WorkTracker</div>
          <div className={styles.header_name_company}>ООО “Купипродай”</div>
        </div>
        <div className={styles.group_header}>
          <div className={styles.header_name}>Иванов Иван Иванович</div>
          <div style={{backgroundImage: `url(https://s3-alpha-sig.figma.com/img/4234/be2b/c2c8992b81f8685935c0441a326a6b93?Expires=1664755200&Signature=HvPEbz7huea8aySsSfYh54vfAkF5ZAJ6h40K0xKprdonRjYbgrwJaAX6KFSLzMrjcS91nP7SAMEaA4Nu9uLqiNInMu3fcqVZU8eqY5yuGwFrgpIKEWq0JRzEVHrsosiYXHD-jI-4eVIUABCtIBa5k6JoZWaO11rI8QqEHaqxifFGe6zlsTPg~7U5fQfiMZu0P8UDWqEsTK89M0d5ZwifmMmjBnEOHBKppBwJc2kXo7k0AeIKHImhLlEfTqp3BBMgXoZmdltSa81n0DgzOC24MhOfwWU~NA2YSEWZ-TYZ2kdOsxF~7cUaWxHuccq7okKQwJtwidG6ggPZYYKZxl6-hw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA)`}}
          className={styles.header_user_img}></div>
        </div>
      </div>
    </div>
  )
}
