import React, { useEffect, useState } from 'react'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { getEquipmetByUser } from '../../db/connection'
import { getUserAuth } from '../../db/localStorage'

export const UserEquipment = () => {
    const [UserEquipments, setUserEquipments] = useState([])
   
    useEffect(() => {
      const getApiData =async()=>{
        let UserAuth = getUserAuth()
        const UserEquipments = await getEquipmetByUser(UserAuth.ID)
        setUserEquipments(UserEquipments)
    }
    getApiData();
      
    }, [])


  return (
    <div className='mainBox'>
        <div className='NavView'>
            <h1 className='title'><HiOutlineDesktopComputer  className='icon'/> Mis equipos</h1>
        </div>

        <div className='incidenteBox mt'>
           {UserEquipments.map((Equipment)=>{
                return(
                <Link className='CardIncidente'>
                    <div className='cardCont'>
                        <div className='RowIncidente'>
                            <h3>{Equipment.Marca+" "+ Equipment.Modelo}</h3>
                        </div>
                        <div className='RowIncidente'>
                            <div className='DataIncidente'>
                                <p><strong>Serial:</strong>  {Equipment.Serial} </p>
                                <p><strong>Ip:</strong>{Equipment.IP} </p>
                            </div>
                        </div>
                    </div>
                </Link>  
                )
            })}
        </div>
    </div>
  )
}
