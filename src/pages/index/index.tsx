import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { imageData } from '@/store/selectors/imageSelector'
import CommonHeader from '@components/common/header/CommonHeader'
import CommonSearchBar from '@components/common/searchBar/CommonSearchBar'
import CommonNav from '@/components/common/navigation/CommonNav'
import CommonFooter from '@/components/common/footer/CommonFooter'
import styles from './styles/index.module.scss'

import Card from './components/Card'
import type { CardDTO } from './types/card'
import DetailDialog from '@/components/common/dialog/DetailDialog'

function index() {
    const imgSelector = useRecoilValue(imageData)
    const [imgData, setImgData] = useState<CardDTO>();
    const [open, setOpen] = useState<boolean>(false); //이미지 상세 다이얼로그 발생(관리) State
    
    const CARD_LIST = imgSelector.data.results.map((card: CardDTO)=>{
        return <Card data={card} key={card.id} handleDialog= {setOpen} handleSetData={setImgData}/>
    })

    
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
            {CARD_LIST}
            </div>
        </div>
        {/* 공통 푸터 UI 부분 */}
        <CommonFooter/>
        {open && <DetailDialog data={imgData} handleDialog={setOpen}/>}
    </div>
    )
}

export default index
