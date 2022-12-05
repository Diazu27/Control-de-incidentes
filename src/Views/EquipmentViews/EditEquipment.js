import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {HiOutlineDesktopComputer,HiPlus} from 'react-icons/hi'

import { Alert } from '../../Components/Alert/Alert';
import { EquipmentsTypes } from '../../Models/EquipmentsTypes';


import { getEquipmentByID, updateEquipment } from '../../db/connection';
import { OperativeSystemsList } from '../../Models/OperativeSystemsList';


export const EditEquipment = () => {
  
  const [ErrorMessage, setErrorMessage] = useState({IsError:false,msg: ""});
  const [IsUpdatedComplete, setIsUpdatedComplete] = useState(false)
  const URLparams = useParams()
  const EquipmentID = URLparams.id;

  const [EquipmentData, setEquipmentData] = useState({
    Marca: '',
    Tipo:'',
    Modelo:'',
    Serial:'',
    MAC:'',
    IP:'',
    SO:'',
  })
  
  useEffect(() => {
    const getApiData = async()=>{
      let equipo = await getEquipmentByID(EquipmentID)
      setEquipmentData({
        Marca: equipo[0].Marca,
        Tipo:equipo[0].Tipo,
        Modelo:equipo[0].Modelo,
        Serial:equipo[0].Serial,
        MAC:equipo[0].MAC,
        IP:equipo[0].IP,
        SO:equipo[0].SO,
      });
    }
    getApiData();
  }, [EquipmentID])

  const validateForm = () =>{
    for (let Field in EquipmentData) {
      if(EquipmentData[Field]==="")return{IsError: true, msg: `El campo ${Field} se encuentra vacio`}
      return{IsError:false,msg:""}
    }
  }
  
  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm();
    setErrorMessage({IsError : IsError,msg: msg})
    if(!IsError){
      const isEquipmentUpdated = await updateEquipment(EquipmentData,EquipmentID);
      if(isEquipmentUpdated) setIsUpdatedComplete(true);
    }
  }
  const handleInputChange = ({target})=>{setEquipmentData({...EquipmentData,[ target.name ]: target.value})}
  
  
  return (
    <div className='mainBox'>
      {IsUpdatedComplete ? <Alert msg='Equipo editado correctamente' path='/admin/equipos' /> : ""}
     
      <div className='NavView'>
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Editar equipo</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {ErrorMessage.IsError ? <div className='FormAlert'>{ErrorMessage.msg}</div> : ""}
        <div className='form-row'>
            <div className='form-box'>
                <label>Marca</label>
                <input type='text' className='form-input' placeholder='Marca' name='Marca' value={EquipmentData.Marca} onChange={handleInputChange} />
            </div>
            <div className='form-box'>
                <label>Tipo</label>
                <select className='form-input' name='Tipo' value={EquipmentData.Tipo} onChange={handleInputChange}>
                  {EquipmentsTypes.map((equipo,i)=>{return <option key={i} value={equipo}>{equipo}</option> })} 
                </select>
            </div>        
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>Modelo</label>
                <input type='text' className='form-input' placeholder='Modelo' name='Modelo' value={EquipmentData.Modelo} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Serial</label>
                <input type='text' className='form-input' placeholder='Serial' name='Serial' value={EquipmentData.Serial} onChange={handleInputChange}/>
            </div>
            
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>MAC</label>
                <input type='text' className='form-input' placeholder='MAC' name='MAC' value={EquipmentData.MAC} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>IP</label>
                <input type='text' className='form-input' placeholder='IP' name='IP' value={EquipmentData.IP} onChange={handleInputChange}/>
            </div>   
        </div>

        <div className='form-row'>
            <div className='form-box'>
                <label>SO</label>
                <select className='form-input' name='SO' value={EquipmentData.SO} onChange={handleInputChange}>
                  {OperativeSystemsList.map((so,i)=>{ return <option key={i} value={so}>{so}</option>})} 
                </select>
            </div> 
        </div>
      </form>
    </div>
  )
}
