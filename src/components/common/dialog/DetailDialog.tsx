import type { CardDTO } from '@/pages/index/types/card'
import styles from './DetailDialog.module.scss'
import { useEffect, useState } from 'react'
import toast, {toastConfig} from 'react-simple-toasts'
import "react-simple-toasts/dist/theme/dark.css"
import 'react-simple-toasts/dist/style.css' 


toastConfig({
    theme: 'dark',
    // position: 'top-center',
    // duration: 500,
    maxVisibleToasts: 3,
    clickClosable: true,

})

interface Props{
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
    bookmarkFlag: (eventeValue: CardDTO) => boolean
}

function DetailDialog({ data, handleDialog }: Props) {
    const [bookmark, setBookmark] = useState(false)
    const closeDialog = () => {
        
        handleDialog(false)
    }

    //북마크 추가 이벤트
    const addBookmark = (selected: CardDTO) => {
        setBookmark(true)
        
        const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"))
        //1. 로컬스토리지에 bookmark라는 데이터가 없을 경우
        if(!getLocalStorage || getLocalStorage === null){
            localStorage.setItem('bookmark', JSON.stringify([selected]))
            toast("해당 이미지를 북마크에 저장하였습니다.");

        } else {
            //2. 해당 이미지가 이미 로컬 스토리지에 bookmark라는 데이터가 저장되어 있는 경우
            if(getLocalStorage.findIndex((item:CardDTO) => item.id === selected.id) > -1) {
                toast("해당 이미지는 이미 북마크에 추가된 상태입니다.");

            } else {
                //3. 해당 이미지가 로컬 스토리지 bookmark라는 데이터에 저장되어 있지 않을 경우
                //  + bookmark라는 데이터에 이미 어떤 값이 담겨 있는 경우
                const res = [...getLocalStorage];
                res.push(selected);
                localStorage.setItem('bookmark',JSON.stringify(res))

                toast("해당 이미지를 북마크에 저장하였습니다.");

            }
        }
    }

    useEffect(()=> {
        const getLocalStorage = JSON.parse(localStorage.getItem("bookmark"))
        if(getLocalStorage && getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1){
            setBookmark(true)
        } else if(!getLocalStorage) return

        const escKeyDownCloseDialog = (event: any) => {
            if(event.key === "Escape") {
                closeDialog()
            }
        }
        //위에 만들어놓은 escKeyDownCloseDialog를 키다운 했을 때 , 이벤트로 등록 및 해지
        document.addEventListener('keydown', escKeyDownCloseDialog)
        return () => document.removeEventListener('keydown',escKeyDownCloseDialog)
    },[])
    //함수 방식 -> 필요할 떄마다 직접 계산
    //useEffect -> 처음 한 번 계산 후 state에 저장
    // const bookmarkFlag = (selected:CardDTO) => {
    //     return JSON.parse(localStorage.getItem("bookmark"))
    //         .some((item:CardDTO) =>item.id === selected.id );
    // }
    return (
        <div className={styles.container}>
            <div className={styles.container_dialog}>
                <div className={styles.container_dialog_header}>

                    <div className={styles.close}>
                        <button className={styles.close_button}>
                            {/* 구글아이콘 사용 */}
                            <span className="material-symbols-outlined" style={{fontSize:28+"px"}} onClick={closeDialog}>
                                close
                            </span>
                            </button>
                        <img src={data.user.profile_image.small} alt="사진작가 프로필 사진" className={styles.close_authorImage} />
                        <span className={styles.close_authorName}>{data.user.name}</span>
                    </div>
                    <div className={styles.bookmark}>
                        <button className={styles.bookmark_button} onClick={()=> addBookmark(data)}>
                            {/* 구글 아이콘 사용 */}
                            {/* {bookmarkFlag(data)?  */}
                            {bookmark ?
                                (<span className="material-symbols-outlined" style={{fontSize:16+"px",color:"red"}}>
                                favorite
                            </span>) 
                            :
                                    ( <span className="material-symbols-outlined" style={{fontSize:16+"px"}}>
                                favorite
                            </span>)}
                            북마크
                        </button>
                        <button className={styles.bookmark_button}>다운로드</button>
                    </div>
                </div>
                <div className={styles.container_dialog_body}>
                    <img src={data.urls.small} alt="상세이미지" className={styles.image} />
                </div>
                <div className={styles.container_dialog_footer}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoBox_item}>
                            <span className={styles.infoBox_item_label}>이미지 크기</span>
                            <span className={styles.infoBox_item_value}>
                                {data.width} X {data.height} 
                                </span>
                        </div>
                        <div className={styles.infoBox_item}>
                            <span className={styles.infoBox_item_label}>업로드</span>
                            <span className={styles.infoBox_item_value}>{data.created_at.split("T")[0]}</span>
                        </div>
                        <div className={styles.infoBox_item}>
                            <span className={styles.infoBox_item_label}>마지막 업데이트</span>
                            <span className={styles.infoBox_item_value}>{data.updated_at.split("T")[0]}</span>
                        </div>
                        <div className={styles.infoBox_item}>
                            <span className={styles.infoBox_item_label}>다운로드</span>
                            <span className={styles.infoBox_item_value}>{data.likes}</span>
                        </div>
                    
                    </div>
                    {/* unsplash에서 단일 검색이 아니면 제공하지 않음 */}
                    {/* <div className={styles.tagBox}>
                        {(data.tags ?? []).map((tag: Tag) => { 
                            return ( 
                            <div className={styles.tagBox_tag} key={tag.title}>
                                {tag.title} das
                            </div>  
                            )
                        })}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default DetailDialog
