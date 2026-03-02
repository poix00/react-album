import CommonHeader from '@components/common/header/CommonHeader'
import CommonSearchBar from '@components/common/searchBar/CommonSearchBar'
import CommonNav from '@/components/common/navigation/CommonNav'
import CommonFooter from '@/components/common/footer/CommonFooter'
import styles from './styles/index.module.scss'

import Card from './components/Card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import type { CardDTO } from './types/card'

function index() {
    const [imgUrls, setImagUrls] = useState([]);
    const getData = async () => { 
        const API_URL = 'https://api.unsplash.com/search/photos';
        const API_KEY = 'LjBpXSNL9XuZvYnLP59NCIw1j913DQ6QS8Fe8_bH2jw';
        const PER_PAGE = 30;

        const searchValue = 'Korea';
        const pageValue = 100;

        try{
            const res = await axios.get(`${API_URL}?query=${searchValue}
                &client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)

                console.log(res);
                //res.data.results라는 배열을 활용

                if(res.status === 200) {
                    setImagUrls(res.data.results);
                }
        } catch(error) {
            console.log(error);
        }

    }
    
    const cardList = imgUrls.map((card: CardDTO)=>{
        return <Card data={card} key={card.id}/>
    })

    useEffect (() => {
        getData();
    }, [])
    return (
        
    <div className={styles.page}>
       {/* {공통헤더 UI 부분} */}
        <CommonHeader/>
       {/* {공통 네비게이션 UI 부분} */}
        <CommonNav/>
        <div className={styles.page_contents}>
            <div className={styles.page_contents_introBox}>
                <div className={styles.wrapper}>
                    <span className={styles.wrapper_title}>PhtoSplash</span>
                    <span className={styles.wrapper_desc}>
                        인터넷의 시각 자료 출처입니다 <br />
                        모든 지역에 있는 크리에이터들의 지원을 받습니다.
                    </span>
                    {/* {검색창 UI 부분} */}
                    <CommonSearchBar/>
                </div>
            </div>
            <div className={styles.page_contents_imageBox}>
               {cardList}
            </div>
        </div>
        {/* 공통 푸터 UI 부분 */}
        <CommonFooter/>
    </div>
    )
}

export default index
