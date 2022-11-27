import {HiPlus} from 'react-icons/hi'
import {AiOutlineUserAdd} from 'react-icons/ai'


import { useForm } from '../../Hooks/useForm'
import { useEffect, useState } from 'react'
import { Alert } from '../../Components/Alert/Alert'
import { getDepartamentos, getRol, insertUsuarios } from '../../db/connection'


export const NuevoUsuario = () => {

  const [Departamentos, setDepartamentos] = useState([])
  const [Rol, setRol] = useState([])


  useEffect(() => {
    const getData = async()=>{
      let data = await getDepartamentos()
      let RolData = await getRol();
      setRol(RolData);
      setDepartamentos(data);
    }
    getData()
  }, [])
  


  const [Error, setError] = useState({
    IsError: false,
    msg: ""
  });

  const [IsComplete, setIsComplete] = useState(false)

  const InitialData = {
    Nombre: '',
    Apellido:'',
    Correo:'',
    Departamento:'',
    Telefono:'',
    Role: 0,
  }

  const  [formValues, handleInputChange,validateForm ] = useForm(InitialData)
  const {Nombre, Apellido, Correo, Departamento, Telefono, Role} = formValues;

  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm()
    
    if(IsError){
      setError({IsError,msg})
    }else{
      setError({IsError})
      const data = await insertUsuarios(formValues);

      if(data){
        setIsComplete(true)
      }
    }
  }



  return (
    <div className='mainBox'>

      {
        IsComplete ? <Alert msg='Usuario creado correctamente' path='/admin/Usuarios'/> : ""
      }
     
      <div className='NavView'>
        <h1 className='title'><AiOutlineUserAdd className='icon'/> Nuevo Usuario</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {
          Error.IsError ? <div className='FormAlert'>{Error.msg}</div> : ""
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
                  {
                    Rol.map((Rol,i)=>{
                      return <option key={i} value={Rol.ID}>{Rol.Nombre}</option>                      
                    })
                  } 
                </select>
            </div> 
            <div className='form-box'>
                <label>Departamento</label>
                <select className='form-input' name='Departamento' value={Departamento} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
                  {
                    Departamentos.map((Departamento,i)=>{
                      return <option key={i} value={Departamento.ID}>{Departamento.Nombre}</option>                      
                    })
                  } 
                </select>
            </div> 
        </div>
      </form>
    </div>
  )
}
