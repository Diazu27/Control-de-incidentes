import {HiOutlineDesktopComputer,HiPlus} from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDepartamentos, getRol, getUsuarioByID, UpdateUsuario } from '../../db/connection';
import { Alert } from '../../Components/Alert/Alert';



export const EditarUsuario = () => {
  
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
  const params = useParams()
  const [Data, setData] = useState({
    Nombre: '',
    Apellido:'',
    Correo:'',
    Departamento:'',
    Telefono:'',
    Role: 0,
  })
  
  useEffect(() => {
    const getData = async()=>{
      let user = await getUsuarioByID(params.id)

      setData({
        Nombre: user[0].Nombre,
        Apellido:user[0].Apellido,
        Correo:user[0].Correo,
        Departamento:user[0].Departamento,
        Telefono:user[0].Telefono,
        Role: user[0].Role
      });
    }
    getData();
  }, [])


  const validateForm = () =>{
    for (let campo in Data) {
      if(Data[campo]===""){
          let msg = `El campo ${campo} se encuentra vacio`;
          
          return{
            IsError: true,
            msg: msg
          }
          
      }else{
        return{
          IsError:false,
          msg:""
        }
      }
   }
  }
  

  const handleSubmit = async()=>{


    const {IsError, msg} = validateForm()

    if(IsError){
      setError({
        IsError : IsError,
        msg: msg
      })
    }else{
      setError({
        IsError : IsError,
        msg: msg
      })
      const data = await UpdateUsuario(Data,params.id);

      if(data){
        setIsComplete(true)
      }
    }

  }

  const handleInputChange = ({target})=>{
    setData({
      ...Data,
      [ target.name ]: target.value
    })

  }
  return (
    <div className='mainBox'>

      {
        IsComplete ? <Alert msg='Usuario editado correctamente' path='/usuarios' /> : ""
      }
     
      <div className='NavView'>
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Editar usuario</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {
          Error.IsError ? <div className='FormAlert'>{Error.msg}</div> : ""
        }

        <div className='form-row'>
            <div className='form-box'>
                <label>Nombre</label>
                <input type='text' className='form-input' placeholder='Nombre' name='Nombre' value={Data.Nombre} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Apellido</label>
                <input type='text' className='form-input' placeholder='Apellido' name='Apellido' value={Data.Apellido} onChange={handleInputChange}/>
            </div>
               
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>Correo</label>
                <input type='email' className='form-input' placeholder='Correo' name='Correo' value={Data.Correo} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Telefono</label>
                <input type='text' className='form-input' placeholder='Telefono' name='Telefono' value={Data.Telefono} onChange={handleInputChange}/>
            </div>
            
        </div>
      
        <div className='form-row'>
            <div className='form-box'>
                <label>Rol</label>
                <select className='form-input' name='Role' value={Data.Role} onChange={handleInputChange}>
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
                <select className='form-input' name='Departamento' value={Data.Departamento} onChange={handleInputChange}>
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
