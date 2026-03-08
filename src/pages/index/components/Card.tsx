import styles from './Card.module.scss'
import type { CardDTO } from '../types/card'


interface Props {
  data: CardDTO
  //             (매개변수 : 타입 => 반환타입)
  handleDialog: (eventValue: boolean) => void
  handleSetData: (eventValue: CardDTO) =>void
}

function Card({ data, handleDialog, handleSetData } : Props) {
    const openDialog = () => {
        handleDialog(true)
        handleSetData(data)
    }
  return (
    <div className={styles.card} onClick={openDialog}>
      <img src={data.urls.small} alt={data.alt_description} className={styles.card_image}/>
    </div>
  )
}

export default Card
