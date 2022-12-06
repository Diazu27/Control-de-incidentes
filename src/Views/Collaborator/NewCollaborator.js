import {HiPlus} from 'react-icons/hi'
import {AiOutlineUserAdd} from 'react-icons/ai'


import { useForm } from '../../Hooks/useForm'
import { useEffect, useState } from 'react'
import { Alert } from '../../Components/Alert/Alert'
import { addUser, getDepartments, getUserRol } from '../../db/connection'


export const NewCollaborator = () => {

  const [Deparments, setDeparments] = useState([])
  const [UserRoles, setUserRoles] = useState([])
  const [ErrorMessage, setErrorMessage] = useState({IsError:false,msg: ""});
  const [IsProcessComplete, setIsProcessComplete] = useState(false)
  const CollaboratorTemplate={
    Nombre: '',
    Apellido:'',
    Correo:'',
    Departamento:'',
    Telefono:'',
    Role: 0,
  };


  const  [CollaboratorformValues, handleInputChange,validateForm ] = useForm(CollaboratorTemplate)
  const {Nombre, Apellido, Correo, Departamento, Telefono, Role} = CollaboratorformValues;

  useEffect(() => {
    const getApiData = async()=>{
      let Deparments = await getDepartments()
      let UserRoles = await getUserRol();
      setUserRoles(UserRoles);
      setDeparments(Deparments);
    }
    getApiData()
  }, [])

  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm();
    setErrorMessage({IsError : IsError,msg: msg})
    if(!IsError){
      const isEquipmentUpdated = await addUser(CollaboratorformValues);
      if(isEquipmentUpdated) setIsProcessComplete(true);
    }
  }

  return (
    <div className='mainBox'>

      {
        IsProcessComplete ? <Alert msg='Usuario creado correctamente' path='/admin/Usuarios'/> : ""
      }
     
      <div className='NavView'>
        <h1 className='title'><AiOutlineUserAdd className='icon'/> Nuevo Usuario</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {
          ErrorMessage.IsError ? <div className='FormAlert'>{ErrorMessage.msg}</div> : ""
        }

        <div className='form-row'>
            <div className='form-box'>
                <label>Nombre</label>
                <input type='text' className='form-input' placeholder='Nombre' name='Nombre' value={Nombre} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Apellido</label>
                <input type='text' className='form-input' placeholder='Apellido' name='Apellido' value={Apellido} onChange={handleInputChange}/>
            </div>
               
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>Correo</label>
                <input type='email' className='form-input' placeholder='Correo' name='Correo' value={Correo} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Telefono</label>
                <input type='text' className='form-input' placeholder='Telefono' name='Telefono' value={Telefono} onChange={handleInputChange}/>
            </div>
            
        </div>
      
        <div className='form-row'>
            <div className='form-box'>
                <label>Rol</label>
                <select className='form-input' name='Role' value={Role} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
                  {UserRoles.map((Role,i)=>{return <option key={i} value={Role.ID}>{Role.Nombre}</option>})} 
                </select>
            </div> 
            <div className='form-box'>
                <label>Departamento</label>
                <select className='form-input' name='Departamento' value={Departamento} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
                  {Deparments.map((Departament,i)=>{return <option key={i} value={Departament.ID}>{Departament.Nombre}</option>})} 
                </select>
            </div> 
        </div>
      </form>
    </div>
  )
}
