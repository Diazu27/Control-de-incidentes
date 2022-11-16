
import {AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'

import './Paginator.css';


export const Paginator = ({count, limit, handlePage, Page}) => {

  const NoBTN = Math.round(count/limit);

  const arr = Array.from(Array(NoBTN))

  const BackPage = ()=>{
    handlePage(Page-limit-1)
  }

  const NextPage = ()=>{
    handlePage(Page+limit+1)
  }

  return (
    <div className='Paginator'>
        <button className={`PaginatorRows ${Page === 0  ? 'disableRow' : ''}`} disabled={Page === 0 ? true : false} onClick={BackPage}><AiOutlineLeft/></button>
        {arr.map((data,i)=>{
            return <button className={`PaginatorNum ${Math.round(Page/limit) === i ? 'PageActive':''}`} key={i} value={i} onClick={(e)=>{
              handlePage(e.target.value*(limit+1))
            }}>{i+1}</button>
        })}

        <button className={`PaginatorRows ${Math.round(Page/limit) >= NoBTN  ? 'disableRow' : ''}`} disabled={Math.round(Page/limit)  >=  NoBTN ? true : false} onClick={NextPage}><AiOutlineRight/></button>
    </div>
  )
}
