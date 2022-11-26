import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../Css/Incidentes.css'
import { getIncidentes } from '../../db/connection'

export const Incidentes = () => {

    const [Incidentes, setIncidentes] = useState([])

    const Colors ={
        ColorUrgente:"ColorUrgente",
        ColorModerado:"ColorModerado",
        ColorNormal:"ColorNormal"
    }

    const setColor=(color)=>{
        if(color === 1) return Colors.ColorUrgente
        if(color === 2) return Colors.ColorModerado
        if(color === 3) return Colors.ColorNormal 
    }

    useEffect(() => {
        const getData = async()=>{
          const data = await getIncidentes();
          setIncidentes(data)
        }
        getData();
      }, [])
      

  return (
    <div className='mainBox incidenteBox'>


        {
            Incidentes.map((incidente,I)=>{
                let Color=incidente.Prioridad.ID;
                return (
                <Link key={I} to={incidente.ID.toString()} className='CardIncidente'>
                    <div className={`bar ${setColor(Color)}`}></div>
                    <div className='cardCont'>
                            <div className='RowIncidente'>
                                <h3>Ticket #{incidente.ID}</h3>
                                <h3 className='fechaIncidente'>{incidente.Created_at}</h3>
                            </div>
        
                            <div className='RowIncidente'>
                                <div className='DataIncidente'>
                                    <p><strong>Departamento:    </strong> {incidente.Usuario.Departamento.Nombre}</p>
                                    <p><strong>Usuario: </strong> {incidente.Usuario.Nombre +" "+ incidente.Usuario.Apellido}</p>
                                </div>
        
                                <div className='IncidentePrioridad'>
                                    <p className={`Prioridad ${setColor(Color)}`}>{incidente.Prioridad.Nombre}</p>
                                </div>
                            </div>
                    </div>
                </Link>      
                )
            })
        }



        
    </div>
  )
}
