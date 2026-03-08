import {useRecoilState, useRecoilValue, useRecoilValueLoadable} from 'recoil'
import styles from './CommonFooter.module.scss'
import { pageState } from '@/store/atoms/pageSate'
import { imageData } from '@/store/selectors/imageSelector';
import { useEffect, useState } from 'react';
import { searchState } from '@/store/atoms/searchState';
// import { key } from 'localforage';

function CommonFooter() {
    // const [page, setPageState] = useRecoilState(pageState);
    const images = useRecoilValueLoadable(imageData);
    const [page,setPage] = useRecoilState(pageState);
    const [step, setStep] = useState(0);
    const search = useRecoilValue(searchState)

    useEffect(() => {
        setStep(0)
    },[search])
    //페이지 리스트 UI
    const newArr: number[] = new Array()
    console.log(images.contents)
    for(let i = 1; i<= images.contents.total_pages; i++) {
        newArr.push(i)
    }   //legnth = 323
    const length = newArr.length
                        //32  1  = 33
    const divide = Math.floor(length/ 10) + (Math.floor(length%10)>0 ? 1 : 0)
    const res = []

    for(let i = 0; i<= divide; i++) {
        //배열 0부터 n개씩 잘라 새 배열에 넣기
        res.push(newArr.splice(0,10))
    }
    // console.log(res)
    // console.log("page : "+page)
    // console.log("length : "+length)

    // const pages = 
    
    const moveToPage = (selected: number) => {
        setPage(selected);
    }

    const moveToPrev = () => {
        if(step === 0) {
            return 
        } else {
            setStep(step - 1)
            setPage(res[ step - 1 ][0])
        }
    }

    const moveToNext = () => {
        console.log(step)
        console.log(res[step].length)
        if(step < res[step].length - 2) {
            setStep(step+1)
            setPage(res[step + 1][0])
        }
    } 
    return (
        <footer className={styles.footer}>
            <div className={styles.pagination}>
                <button className={styles.pagination_button}>
                    <img src='src/assets/icons/icon-arrowLeft.svg' alt='' onClick={moveToPrev}/>
                </button>
                {/* <span>1</span> */}
                {res[step] &&
                res[step].map((item:number,index:number)=>{
                    if(item < 11) {
                        return (<button className={ index === page  - 1 ?
                                `${styles.pagination_button} ${styles.active}` :
                                `${styles.pagination_button} ${styles.inactive}` }
                                key={item} onClick={()=>moveToPage(item)}>{item}</button> )
                        } else {
                            return ( <button className={ index === page - 1 - step * 10 ?
                                `${styles.pagination_button} ${styles.active}` :
                                `${styles.pagination_button} ${styles.inactive}` }
                                key={item} onClick={()=>moveToPage(item)}>{item}</button> )
                        }
                    })}
                <button className={styles.pagination_button}>
                    <img src='src/assets/icons/icon-arrowRight.svg' alt='' onClick={moveToNext}/>
                </button>
            </div>
        </footer>
    )
}
export default CommonFooter