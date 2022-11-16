import React from 'react'

import icon from '../../Img/ok.gif'
import './Alert.css'

export const AlertReload = ({msg="", handleState}) => {

    const handleClick = ()=>{
      handleState({
        isDeleted:false
      })
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