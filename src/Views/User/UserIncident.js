import React, { useEffect, useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

import {HiPlus } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { getIncidentsByUser } from '../../db/connection'
import { getUserAuth } from '../../db/localStorage'

export const UserIncident = () => {

    const [IncidentData, setIncidentData] = useState([])

    const Colors ={
        UrgentColor:"ColorUrgente",
        ModerateColor:"ColorModerado",
        NormalColor:"ColorNormal"
    }

    const setColor=(color)=>{
        if(color === 1) return Colors.UrgentColor
        if(color === 2) return Colors.ModerateColor
        if(color === 3) return Colors.NormalColor 
    }

    useEffect(() => {
        const getApiData =async()=>{
            let UserAuth = getUserAuth()
            const UserIncidents = await getIncidentsByUser(UserAuth.ID)
            setIncidentData(UserIncidents)
        }
        getApiData();
    }, [])
   

  return (
    <div className='mainBox'>
        <div className='NavView'>
            <h1 className='title'><FiAlertTriangle className='icon'/>Mis Incidentes</h1>
            <Link to="new" className='Btn-Nuevo'> <HiPlus className='icon'/> Nuevo Incidente </Link>
        </div>

        <div className='incidenteBox mt'>
            {IncidentData.map((incident,i)=>{
                        let ID = incident.ID.toString();
                    return(
                        <Link key={i} to={ID} className='CardIncidente'>
                            <div className={`bar ${setColor(incident.Prioridad.ID)}`}></div>
                            <div className='cardCont'>
                                    <div className='RowIncidente'>
                                        <h3>Ticket #{incident.ID}</h3>
                                        <h3 className='fechaIncidente'>{incident.Created_at}</h3>
                                    </div>

                                    <div className='RowIncidente'>
                                        <div className='DataIncidente'>
                                            <p><strong>Departamento:</strong> {incident.Usuario.Departamento.Nombre}  </p>
                                            <p><strong>Usuario: </strong>{incident.Usuario.Nombre +" "+incident.Usuario.Apellido}</p>
                                        </div>

                                        <div className='IncidentePrioridad'>
                                            <p className={`Prioridad ${setColor(incident.Prioridad.ID)}`}> {incident.Prioridad.Nombre}</p>
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
