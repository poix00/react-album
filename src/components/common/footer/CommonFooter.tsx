import {useRecoilState} from 'recoil'
import styles from './CommonFooter.module.scss'
import { pageState } from '@/store/atoms/pageSate'

function CommonFooter() {
    const [page, setPageState] = useRecoilState(pageState);
    function pageUp(){
        setPageState((prev => prev+1));
        
    }
    return (
        <footer className={styles.footer}>
            <div className={styles.pagination}>
                <button className={styles.pagination_button}>
                    <img src='src/assets/icons/icon-arrowLeft.svg' alt=''/>
                </button>
                <span>1</span>
                <button className={styles.pagination_button} onClick={pageUp}>
                    <img src='src/assets/icons/icon-arrowRight.svg' alt=''/>
                </button>
            </div>
        </footer>
    )
}
export default CommonFooter