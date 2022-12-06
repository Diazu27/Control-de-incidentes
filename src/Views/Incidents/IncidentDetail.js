
import React, { useEffect, useState } from 'react'
import {FiAlertTriangle} from 'react-icons/fi'
import {FaLaptop} from 'react-icons/fa'
import {HiSortDescending} from 'react-icons/hi'
import {BiMessageCheck} from 'react-icons/bi'
import { useParams } from 'react-router-dom'

import { useForm } from '../../Hooks/useForm'
import { Alert } from '../../Components/Alert/Alert'
import { getIncidentByID, SendIncidentMessage } from '../../db/connection'

export const IncidentDetail = () => {

  const [ErrorMessage, setErrorMessage] = useState({IsError:false,msg: ""});
  const [IsProcessComplete, setIsProcessComplete] = useState(false)

  const URLparams = useParams()
  const IncidentID = URLparams.id;

  const [IncidentData, setIncidentData] = useState(
    {
      Comentario:'',
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
  const [AnswerInputValue, handleInputChange, validateForm] = useForm({Answer:""})
  const {Answer} = AnswerInputValue;


  useEffect(() => {
    const getData = async()=>{
      const data = await getIncidentByID(IncidentID);
      setIncidentData(data[0])
    }
    getData();
  }, [IncidentID])


  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm();
    setErrorMessage({IsError : IsError,msg: msg})
    if(!IsError){
      const isEquipmentUpdated = await SendIncidentMessage(Answer,IncidentID);
      if(isEquipmentUpdated) setIsProcessComplete(true);
    }    
  }
  
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
  
return (
    <div className='mainBox'>


      {
        IsProcessComplete ? <Alert msg='Mensaje enviado' path='/admin/incidentes'/> : ""
      }
      <div className='NavView'>
        <h1 className='title'><FiAlertTriangle className='icon'/> Información de incidente</h1>
        <label className={`PrioridadLabel ${setColor(IncidentData.Prioridad.ID)}`}>{IncidentData.Prioridad.Nombre}</label>
           
      </div>

      <div className='IncidenteDetail'>
        <div className='DetailBox'>
          <div className='ProblemTitle'>          
            <h2 className='subTitle'><BiMessageCheck className='icon'/>Información</h2>
          </div>

          <div className='DetailBody'>
          <div className='DataRow'>
            <p className='Data'>
              <strong>Nombre: </strong> {IncidentData.Usuario.Nombre+" "+IncidentData.Usuario.Apellido}
            </p>
            <p className='Data'>
              <strong>Correo: </strong> {IncidentData.Usuario.Correo}
            </p>
            <p className='Data'>
              <strong>Departamento: </strong> {IncidentData.Usuario.Departamento.Nombre}
            </p>
            <p className='Data'>
              <strong>Telefono:</strong> {IncidentData.Usuario.Telefono}
            </p>

          </div>

          <div className='DataRow'>
            <p className='Data'>
              <strong>Fecha de creación: </strong> {IncidentData.Created_at}
            </p>
            <p className='Data'>
              <strong>Status</strong> {IncidentData.Status.Nombre}
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
              <strong>Marca: </strong> {IncidentData.Equipo.Marca}
            </p>
            <p className='Data'>
              <strong>Modelo: </strong> {IncidentData.Equipo.Modelo}
            </p>
            <p className='Data'>
              <strong>Tipo: </strong> {IncidentData.Equipo.Tipo}
            </p>
            <p className='Data'>
              <strong>Serie: </strong> {IncidentData.Equipo.Serial}
            </p>

          </div>

          <div className='DataRow'>
            <p className='Data'>
              <strong>IP: </strong> {IncidentData.Equipo.IP}
            </p>
            <p className='Data'>
              <strong>Mac: </strong> {IncidentData.Equipo.MAC}
            </p>
            <p className='Data'>
              <strong>Sistema Operativo: </strong> {IncidentData.Equipo.SO}
            </p>
          </div>
          </div>
        </div>
      </div>

      <div className='problemBox'>
        <div className='ProblemTitle'>          
          <h2 className='subTitle'><HiSortDescending className='icon'/>Descripción</h2>
        </div>
        <p>{IncidentData.Comentario}</p>
      </div> 


      <div className='MsgBox'>

        <div className='ProblemTitle'>          
          <h2 className='subTitle'><BiMessageCheck className='icon'/>Enviar mensaje</h2>
        </div>

        {
          ErrorMessage.IsError ? <div className='FormAlert'>{ErrorMessage.msg}</div> : ""
        }

        <textarea className='form-input text' name='Respuesta' value={Answer} onChange={handleInputChange}></textarea>
        <button className='Btn-Nuevo Btn-Incidente' onClick={handleSubmit}>Enviar</button>
      </div>


    </div>
  )
}
