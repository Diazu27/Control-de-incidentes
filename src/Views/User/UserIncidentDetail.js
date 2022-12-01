
import React, { useEffect, useState } from 'react'
import {FiAlertTriangle} from 'react-icons/fi'
import {FaLaptop} from 'react-icons/fa'
import {HiPlus, HiSortDescending} from 'react-icons/hi'
import {BiMessageCheck} from 'react-icons/bi'
import {CloseIncident, getIncidenteByID} from '../../db/connection'
import { useParams } from 'react-router-dom'
import { Alert } from '../../Components/Alert/Alert'


export const UserIncidentDetail = () => {

  const [IsComplete, setIsComplete] = useState(false)

  const [Incidente, setIncidente] = useState(
    {
      ID:0,
      Comentario:'',
      Respuesta:'',
      Usuario: {Nombre:'',Departamento:{Nombre:''}},
      Prioridad: {Nombre:''},
      Status: {Nombre:''},
      Equipo:{
        Marca:'',
        Modelo:'',
        Tipo:'',
        Serial:'',
        IP:'',
        SO:'',
        MAC:''
      }
    }
  )
  
  

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

  const params = useParams()

  useEffect(() => {
    const getData = async()=>{
      const data = await getIncidenteByID(params.id);
      setIncidente(data[0])
    }
    getData();
  }, [params])
  

  const HandleCloseIncident = ()=>{
    const data = CloseIncident(params.id)
    if(data){
      setIsComplete(true)
    }

  }



  return (
    <div className='mainBox'>

      {
        IsComplete ? <Alert msg='¡Gracias! Incidente cerrado' path='/client/incidentes'/> : ""
      }
      <div className='NavView'>
        <h1 className='title'><FiAlertTriangle className='icon'/> Información de incidente</h1>

        <div className='BtnBoxIncident'>
         <label className={`PrioridadLabel ${setColor(Incidente.Prioridad.ID)}`}>{Incidente.Prioridad.Nombre}</label>
         <button className='Btn-Nuevo' onClick={HandleCloseIncident}> <HiPlus className='icon'/> Cerrar incidente</button>
        </div>
      </div>

      <div className='IncidenteDetail'>
        <div className='DetailBox'>
          <div className='ProblemTitle'>          
            <h2 className='subTitle'><BiMessageCheck className='icon'/>Información</h2>
          </div>

          <div className='DetailBody'>
          <div className='DataRow'>
            <p className='Data'>
              <strong>Nombre: </strong> {Incidente.Usuario.Nombre+" "+Incidente.Usuario.Apellido}
            </p>
            <p className='Data'>
              <strong>Correo: </strong> {Incidente.Usuario.Correo}
            </p>
            <p className='Data'>
              <strong>Departamento: </strong> {Incidente.Usuario.Departamento.Nombre}
            </p>
            <p className='Data'>
              <strong>Telefono:</strong> {Incidente.Usuario.Telefono}
            </p>

          </div>

          <div className='DataRow'>
            <p className='Data'>
              <strong>Fecha de creación: </strong> {Incidente.Created_at}
            </p>
            <p className='Data'>
              <strong>Status</strong> {Incidente.Status.Nombre}
            </p>
          </div>
          </div>
        </div>
        <div className='DetailBox'>
          <div className='ProblemTitle'>          
            <h2 className='subTitle'><FaLaptop className='icon'/>Equipo</h2>
          </div>

          <div className='DetailBody'>
          <div className='DataRow'>
            <p className='Data'>
              <strong>Marca: </strong> {Incidente.Equipo.Marca}
            </p>
            <p className='Data'>
              <strong>Modelo: </strong> {Incidente.Equipo.Modelo}
            </p>
            <p className='Data'>
              <strong>Tipo: </strong> {Incidente.Equipo.Tipo}
            </p>
            <p className='Data'>
              <strong>Serie: </strong> {Incidente.Equipo.Serial}
            </p>

          </div>

          <div className='DataRow'>
            <p className='Data'>
              <strong>IP: </strong> {Incidente.Equipo.IP}
            </p>
            <p className='Data'>
              <strong>Mac: </strong> {Incidente.Equipo.MAC}
            </p>
            <p className='Data'>
              <strong>Sistema Operativo: </strong> {Incidente.Equipo.SO}
            </p>
          </div>
          </div>
        </div>
      </div>

      <div className='problemBox'>
        <div className='ProblemTitle'>          
          <h2 className='subTitle'><HiSortDescending className='icon'/>Descripción</h2>
        </div>
        <p>{Incidente.Comentario}</p>
      </div> 

      {
        Incidente.Respuesta !== null ? 
        <div className='problemBox mb-2'>
        <div className='ProblemTitle'>          
          <h2 className='subTitle'><HiSortDescending className='icon'/>Respuesta</h2>
        </div>
        <p>{Incidente.Respuesta}</p>
      </div> 
      :""
      }

    </div>
  )
}
