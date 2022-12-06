import {HiOutlineDesktopComputer,HiPlus} from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Alert } from '../../Components/Alert/Alert';
import { getDepartments, getUserByID, getUserRol, updateUser } from '../../db/connection';



export const EditCollaborator = () => {

  const URLparams = useParams()
  const CollaboratorID = URLparams.id;

  const [Deparments, setDeparments] = useState([])
  const [UserRoles, setUserRoles] = useState([])
  const [ErrorMessage, setErrorMessage] = useState({IsError:false,msg: ""});
  const [IsProcessComplete, setIsProcessComplete] = useState(false)
  const [CollaboratorData, setCollaboratorData] = useState({
    Nombre: '',
    Apellido:'',
    Correo:'',
    Departamento:'',
    Telefono:'',
    Role: 0,
  })

  useEffect(() => {
    const getApiData = async()=>{
      let Deparments = await getDepartments()
      let UserRoles = await getUserRol();
      setUserRoles(UserRoles);
      setDeparments(Deparments);
    }
    getApiData()
  }, [])
  
  useEffect(() => {
    const getApiData = async()=>{
      let Collaborator = await getUserByID(CollaboratorID)
      setCollaboratorData({
        Nombre: Collaborator[0].Nombre,
        Apellido:Collaborator[0].Apellido,
        Correo:Collaborator[0].Correo,
        Departamento:Collaborator[0].Departamento,
        Telefono:Collaborator[0].Telefono,
        Role: Collaborator[0].Role
      });
    }
    getApiData();
  }, [CollaboratorID])



  const validateForm = () =>{
    for (let Field in CollaboratorData) {
      if(CollaboratorData[Field]==="")return{IsError: true, msg: `El campo ${Field} se encuentra vacio`}
      return{IsError:false,msg:""}
    }
  }
 
  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm();
    setErrorMessage({IsError : IsError,msg: msg})
    if(!IsError){
      const isEquipmentUpdated = await updateUser(CollaboratorData,CollaboratorID);
      if(isEquipmentUpdated) setIsProcessComplete(true);
    }
  }


  const handleInputChange = ({target})=>setCollaboratorData({...CollaboratorData,[ target.name ]: target.value})


  return (
    <div className='mainBox'>
      {IsProcessComplete ? <Alert msg='Usuario editado correctamente' path='/admin/usuarios' /> : ""}
      <div className='NavView'>
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Editar usuario</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {ErrorMessage.IsError ? <div className='FormAlert'>{ErrorMessage.msg}</div> : ""}
        <div className='form-row'>
            <div className='form-box'>
                <label>Nombre</label>
                <input type='text' className='form-input' placeholder='Nombre' name='Nombre' value={CollaboratorData.Nombre} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Apellido</label>
                <input type='text' className='form-input' placeholder='Apellido' name='Apellido' value={CollaboratorData.Apellido} onChange={handleInputChange}/>
            </div>
               
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>Correo</label>
                <input type='email' className='form-input' placeholder='Correo' name='Correo' value={CollaboratorData.Correo} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Telefono</label>
                <input type='text' className='form-input' placeholder='Telefono' name='Telefono' value={CollaboratorData.Telefono} onChange={handleInputChange}/>
            </div>
            
        </div>
      
        <div className='form-row'>
            <div className='form-box'>
                <label>Rol</label>
                <select className='form-input' name='Role' value={CollaboratorData.Role} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
                  {UserRoles.map((Role,i)=>{return <option key={i} value={Role.ID}>{Role.Nombre}</option>})} 
                </select>
            </div> 
            <div className='form-box'>
                <label>Departamento</label>
                <select className='form-input' name='Departamento' value={CollaboratorData.Departamento} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
                  {Deparments.map((Departament,i)=>{return <option key={i} value={Departament.ID}>{Departament.Nombre}</option>})} 
                </select>
            </div> 
        </div>
      </form>
    </div>
  )
}
