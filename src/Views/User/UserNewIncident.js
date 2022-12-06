import React, { useEffect, useState } from 'react'
import { HiOutlineDesktopComputer, HiPlus } from 'react-icons/hi';
import { Alert } from '../../Components/Alert/Alert';
import { CreateIncident, getEquipmetByUser } from '../../db/connection';
import { getUserAuth } from '../../db/localStorage';
import { useForm } from '../../Hooks/useForm';
import { PrioridadList } from '../../Models/PrioridadList';

export const UserNewIncident = () => {

  const incidentTemplate={
      ID_Equipo: '',
      ID_User:0,
      Comentario:'',
      Prioridad:0,
    }

  const UserAuth = getUserAuth()
  const [UserEquipment, setUserEquipment] = useState([])
  useEffect(() => {
    const getApiData =async()=>{
      const UserEquipments = await getEquipmetByUser(UserAuth.ID)
      setUserEquipment(UserEquipments);
    }
  getApiData();
    
  }, [UserAuth])
     
  const [ErrorMessage, setErrorMessage] = useState({IsError:false,msg: ""});
  const [IsProcessComplete, setIsProcessComplete] = useState(false)    
  const  [EquipmentformValues, handleInputChange,validateForm ] = useForm(incidentTemplate)
  const {ID_Equipo,Prioridad,Comentario} = EquipmentformValues;
    

  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm();
    setErrorMessage({IsError : IsError,msg: msg})
    if(!IsError){
      const isEquipmentUpdated = await CreateIncident({...EquipmentformValues,ID_User:UserAuth.ID});
      if(isEquipmentUpdated) setIsProcessComplete(true);
    }    
  }
   
  return (
    <div className='mainBox'>
    {IsProcessComplete ? <Alert msg='Incidente creado correctamente' path='/client/incidentes'/> : ""}
   
    <div className='NavView'>
      <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Nuevo incidente</h1>
      <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Enviar</button>
    </div>

    <form className='form'>
      { ErrorMessage.IsError ? <div className='FormAlert'>{ErrorMessage.msg}</div> : ""}

      <div className='form-row'>
          <div className='form-box'>
              <label>Equipo</label>
              <select className='form-input' name='ID_Equipo' value={ID_Equipo} onChange={handleInputChange}>
                <option value="">SELECCIONE...</option>
                {UserEquipment.map((Data)=>{return <option key={Data.ID} value={parseInt(Data.ID)}>{Data.Tipo+" - "+Data.Marca + " " +Data.Modelo}</option>})} 
              </select>
          </div>   
          <div className='form-box'>
              <label>Prioridad</label>
              <select className='form-input' name='Prioridad' value={Prioridad} onChange={handleInputChange}>
                <option value="">SELECCIONE...</option>
                {PrioridadList.map((Data)=>{return <option key={Data.ID} value={Data.ID}>{Data.Nombre}</option>}) } 
              </select>
          </div>       
      </div>
      <div className='form-row'>
          <div className='form-box'>
              <label>Descripción</label>
              <textarea style={{height:150}} type='text' className='form-input' placeholder='Comentario' name='Comentario' value={Comentario} onChange={handleInputChange}/>
          </div>
      </div>
    </form>
  </div>
  )
}
