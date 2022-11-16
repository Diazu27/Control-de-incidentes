import React from 'react'
import { useNavigate } from 'react-router-dom'

import icon from '../../Img/ok.gif'
import './Alert.css'

export const Alert = ({msg="", path=""}) => {
  const navigate = useNavigate()

    const handleClick = ()=>{
      navigate(path)
    }

  return (
    <div className='AlertCont'>

        <div className='AlertCard'>
            <img alt='' src={icon}/>
            <h3>{msg}</h3>
            <button className ='cardButton' onClick={handleClick}>OK</button>
        </div>

    </div>
  )
}

//https://i.gifer.com/7efs.gif