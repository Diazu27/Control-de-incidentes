import React, { useEffect, useState } from 'react'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { getEquiposByUser } from '../../db/connection'
import { getUserAuth } from '../../db/localStorage'

export const UserEquipo = () => {
    const [UserEquipment, setUserEquipment] = useState([])
    useEffect(() => {
      const getData =async()=>{
        let UserAuth = getUserAuth()
        const Data = await getEquiposByUser(UserAuth.ID)
        setUserEquipment(Data)
    }
    getData();
      
    }, [])


  return (
    <div className='mainBox'>

        <div className='NavView'>
            <h1 className='title'><HiOutlineDesktopComputer  className='icon'/> Mis equipos</h1>
        </div>

        <div className='incidenteBox mt'>
           {
            UserEquipment.map((Equipo)=>{
                return(
                <Link className='CardIncidente'>
                    <div className='cardCont'>
                        <div className='RowIncidente'>
                            <h3>{Equipo.Marca+" "+ Equipo.Modelo}</h3>
                        </div>
    
                        <div className='RowIncidente'>
                            <div className='DataIncidente'>
                                <p><strong>Serial:</strong>  {Equipo.Serial} </p>
                                <p><strong>Ip:</strong>{Equipo.IP} </p>
                            </div>
    
                        </div>
                    </div>
                </Link>  
                )
            })
           }

        </div>
    </div>
  )
}
