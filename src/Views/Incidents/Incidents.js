import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../../Css/Incidentes.css'
import { getIncidents, getIncidentsByUser } from '../../db/connection'

export const Incidents = () => {
    
    const [Incidents, setIncidents] = useState([])
    const [UserID, setUserID] = useState("")
    
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
        const getApiData = async()=>{
          const Incident = await getIncidents();
          setIncidents(Incident)
        }
        getApiData();
      }, [])
      

    const handleOnChange = ({target})=>{setUserID(target.value)}

    const LoadUserData = async()=>{
        let IncidentData = UserID.length <=0? await getIncidents():await getIncidentsByUser(UserID);
        setIncidents(IncidentData)
    }

  return (
    <div className='mainBox'>
    <div className='ChartBox'> 
        <div className='form-row'>
              <div className='form-box'>
                  <label>ID de Usuario</label>
                 <div className='Search'>
                     <input type='number' className='form-input SearchInput' placeholder='Id de usuario' name='UserID' value={UserID} onChange={handleOnChange}/>
                     <button className='Btn-Nuevo' onClick={LoadUserData}> <FaSearch className='icon'/> Buscar</button>
                 </div>
              </div>
                
          </div>
      </div>
    <div className=' incidenteBox mt'>
        {
            Incidents.map((incident,I)=>{
                let Color=incident.Prioridad.ID;
                return (
                <Link key={I} to={incident.ID.toString()} className='CardIncidente'>
                    <div className={`bar ${setColor(Color)}`}></div>
                    <div className='cardCont'>
                            <div className='RowIncidente'>
                                <h3>Ticket #{incident.ID}</h3>
                                <h3 className='fechaIncidente'>{incident.Created_at}</h3>
                            </div>
        
                            <div className='RowIncidente'>
                                <div className='DataIncidente'>
                                    <p><strong>Departamento:    </strong> {incident.Usuario.Departamento.Nombre}</p>
                                    <p><strong>Usuario: </strong> {incident.Usuario.Nombre +" "+ incident.Usuario.Apellido}</p>
                                </div>
        
                                <div className='IncidentePrioridad'>
                                    <p className={`Prioridad ${setColor(Color)}`}>{incident.Prioridad.Nombre}</p>
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
