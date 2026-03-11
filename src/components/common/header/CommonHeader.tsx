import { useNavigate } from 'react-router-dom'
import styles from './CommonHeader.module.scss'

function CommonHeader() {
    const navigate = useNavigate()
    //북마크 페이지 이동
    const moveToPage = (filter: String) => {
        if(filter === "main"){
            navigate('/')

        } else if(filter === "bookmark"){
            navigate('/bookmark')

        }
    }
    return ( 
        <header className={styles.header}>
            <div className={styles.header_logoBox} onClick={() => moveToPage("main")}>
                <img src="src/assets/images/logo-icon.png" alt='' className={styles.header_logoBox_logo}/>
                <span className={styles.header_logoBox_title}>PhotoSplash</span>
            </div>

            <div className={styles.header_profileBox}>
                <button className={styles.header_profileBox_button}>사진제출</button>
                <button className={styles.header_profileBox_button} onClick={() => moveToPage('bookmark')}>북마크</button>
                <span className={styles.header_profileBox_userName}>poix00 | poix00@gmail.com</span>
            </div>
        </header>
    )
}

export default CommonHeader
