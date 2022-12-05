import {HiOutlineDesktopComputer,HiPlus} from 'react-icons/hi'


import { useForm } from '../../Hooks/useForm'
import { useState } from 'react'
import { Alert } from '../../Components/Alert/Alert'
import { addEquipment } from '../../db/connection'

import { EquipmentsTypes } from '../../Models/EquipmentsTypes'
import { OperativeSystemsList } from '../../Models/OperativeSystemsList'


export const NewEquipment = () => {

  const [ErrorMessage, setErrorMessage] = useState({IsError:false,msg: ""});
  const [IsProcessComplete, setIsProcessComplete] = useState(false)

  const EquipmentDataTemplate = {
    Marca: '',
    Tipo:'',
    Modelo:'',
    Serial:'',
    MAC:'',
    IP:'',
    SO:'',
  }

  const  [EquipmentData,handleInputChange,validateForm] = useForm(EquipmentDataTemplate)
  const {Marca, Tipo, Modelo, Serial, MAC, IP, SO} = EquipmentData;
  
  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm();
    setErrorMessage({IsError : IsError,msg: msg})
    if(!IsError){
      const isEquipmentUpdated = await addEquipment(EquipmentData);
      if(isEquipmentUpdated) setIsProcessComplete(true);
    }
  }
  return (
    <div className='mainBox'>
      {IsProcessComplete ? <Alert msg='Equipo creado correctamente' path='/admin/equipos'/> : ""}
      <div className='NavView'>
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Nuevo equipo</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {ErrorMessage.IsError ? <div className='FormAlert'>{ErrorMessage.msg}</div> : ""}

        <div className='form-row'>
            <div className='form-box'>
                <label>Marca</label>
                <input type='text' className='form-input' placeholder='Marca' name='Marca' value={Marca} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Tipo</label>
                <select className='form-input' name='Tipo' value={Tipo} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
                  {EquipmentsTypes.map((equipo,i)=>{return <option key={i} value={equipo}>{equipo}</option>})} 
                </select>
            </div>        
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>Modelo</label>
                <input type='text' className='form-input' placeholder='Modelo' name='Modelo' value={Modelo} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Serial</label>
                <input type='text' className='form-input' placeholder='Serial' name='Serial' value={Serial} onChange={handleInputChange}/>
            </div>
            
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>MAC</label>
                <input type='text' className='form-input' placeholder='Marca' name='MAC' value={MAC} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>IP</label>
                <input type='text' className='form-input' placeholder='IP' name='IP' value={IP} onChange={handleInputChange}/>
            </div>   
        </div>

        <div className='form-row'>
            <div className='form-box'>
                <label>SO</label>
                <select className='form-input' name='SO' value={SO} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
                  {OperativeSystemsList.map((so,i)=>{return <option key={i} value={so}>{so}</option>})} 
                </select>
            </div> 
        </div>
      </form>
    </div>
  )
}
