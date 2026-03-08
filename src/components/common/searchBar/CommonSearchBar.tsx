import { useState } from 'react'
import styles from './CommonSearchBar.module.scss'
import { useRecoilState } from 'recoil';
import { searchState } from '@/store/atoms/searchState';


function CommonSearchBar() {
  const [text,setText] = useState("");
  const [search, setSearch] = useRecoilState(searchState)

  const onChange = (event) => {
    console.log(event.target.value)
    setText(event.target.value)
  }

  const onSearch = () => {
      if(text === "") {
        setSearch("Korea");
      } else {
        setSearch(text)
      }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if(event.key === "Enter") {
      console.log('dd')
      if(text === "") {
        //input 태그 안에 빈 값으로 검색하였을 때 => searching default value
        setSearch("Korea");
      } else {
        setSearch(text) // 작성한 input value값 할당 
      }
    }
  }
  return (
    <div className={styles.searchBar}>
        <div className={styles.searchBar_search}>
            <input type='text' placeholder='찾으실 이미지를 검색하세요.' className={styles.searchBar_search_input} value={text} onChange={onChange} onKeyDown={handleKeyDown}/>
            <img src='src/assets/icons/icon-search.svg' alt='' onClick={onSearch}/>
        </div>
    </div>
  )
}

export default CommonSearchBar
