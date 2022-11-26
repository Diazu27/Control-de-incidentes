import React, { useEffect, useState } from 'react'
import { HiOutlineDesktopComputer, HiPlus } from 'react-icons/hi';
import { Alert } from '../../Components/Alert/Alert';
import { CreateIncident, getEquiposByUser } from '../../db/connection';
import { getUserAuth } from '../../db/localStorage';
import { useForm } from '../../Hooks/useForm';
import { PrioridadList } from '../../Models/PrioridadList';

export const UserNewIncident = () => {

  const InitialData = {
    ID_Equipo: '',
    ID_User:0,
    Comentario:'',
    Prioridad:0,
  }

    const [UserEquipment, setUserEquipment] = useState([])
    useEffect(() => {
      const getData =async()=>{
        let UserAuth = getUserAuth()
        const Data = await getEquiposByUser(UserAuth.ID)
        InitialData.ID_User = UserAuth.ID;
        setUserEquipment(Data)
    }
    getData();
      
    }, [])
    

    const [Error, setError] = useState({
        IsError: false,
        msg: ""
      });
    
      const [IsComplete, setIsComplete] = useState(false)
    
      const  [formValues, handleInputChange,validateForm ] = useForm(InitialData)
      const {ID_Equipo,Prioridad,Comentario} = formValues;
    
      const handleSubmit = async()=>{
        const {IsError, msg} = validateForm()
        
        if(IsError){
          setError({IsError,msg})
        }else{
          setError({IsError})
          const data = CreateIncident(formValues)
    
          if(data){
            setIsComplete(true)
          }
        }
      }
    
  return (
    <div className='mainBox'>

    {
      IsComplete ? <Alert msg='Incidente creado correctamente' path='/incidentes'/> : ""
    }
   
    <div className='NavView'>
      <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Nuevo incidente</h1>
      <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Enviar</button>
    </div>

    <form className='form'>
      {
        Error.IsError ? <div className='FormAlert'>{Error.msg}</div> : ""
      }

      <div className='form-row'>
          <div className='form-box'>
              <label>Equipo</label>
              <select className='form-input' name='ID_Equipo' value={ID_Equipo} onChange={handleInputChange}>
                <option value="">SELECCIONE...</option>
                {
                  UserEquipment.map((Data)=>{
                  return <option key={Data.ID} value={parseInt(Data.ID)}>{Data.Tipo+" - "+Data.Marca + " " +Data.Modelo}</option>
                  })
                } 
              </select>
          </div>   
          <div className='form-box'>
              <label>Prioridad</label>
              <select className='form-input' name='Prioridad' value={Prioridad} onChange={handleInputChange}>
                <option value="">SELECCIONE...</option>
                {
                 PrioridadList.map((Data)=>{
                  return <option key={Data.ID} value={Data.ID}>{Data.Nombre}</option>
                 })
                } 
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
