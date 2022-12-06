import React, { useEffect, useState } from 'react'
import {HiPlus,HiPencilAlt} from 'react-icons/hi'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {MdDeleteForever} from 'react-icons/md'
import { Link } from 'react-router-dom';

import '../../Css/BaseStyles.css';
import { Confirm } from '../../Components/Alert/Confirm';
import { AlertReload } from '../../Components/Alert/AlertReload';
import { Paginator } from '../../Components/Paginator/Paginator';
import { deleteUser, getUserByRange } from '../../db/connection';

export const Collaborators = () => {

  const [CollaboratorData, setCollaboratorData] = useState([])
  const [CollaboratorDeleted, setCollaboratorDeleted] = useState({isDeleted: false, id:0, Confirm: false})
  
  const [Pages, setPages] = useState(0)
  const [Count, setCount] = useState(0);
  const Limit = 4;
  
  useEffect(()=>{
    const getApiData = async()=>{
      let {data,count} = await getUserByRange(Pages, Pages+Limit);
      setCount(count)
      setCollaboratorData(data)
    }
    getApiData()
  },[Pages])

  const handleDelete = (CollaboratorID) => setCollaboratorDeleted({Confirm:true,id: CollaboratorID})

  return (
    <div className='mainBox'>


      {CollaboratorDeleted.Confirm? <Confirm msg='¿Seguro que quiere eliminar el Usuario?' ID={CollaboratorDeleted.id} Confirm={setCollaboratorDeleted} handleDelete={deleteUser}/>: ''}  
      {CollaboratorDeleted.isDeleted? <AlertReload msg='Usuario Eliminado Correctamente' handleState={setCollaboratorDeleted} /> : '' } 

      <div className='NavView'>
        <h1 className='title'><AiOutlineUserAdd className='icon'/> Usuarios</h1>
        <Link to="new" className='Btn-Nuevo'> <HiPlus className='icon'/> Nuevo Usuario </Link>
      </div>

      <div className='ChartBox'>
        
      </div>

      <table className='Table'>
        <thead className='TableHead'>
          <tr>
            <th className='IDColumn'>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Departamento</th>
            <th>Telefono</th>
            <th>Opciones</th>
          
          </tr>
        </thead>
        <tbody>

          {
           CollaboratorData.map((Collaborator, i)=>{
            return (
              <tr key={i}>
              <td className='IDColumn'>{Collaborator.ID}</td>
              <td>{Collaborator.Nombre}</td>
              <td>{Collaborator.Apellido}</td>
              <td>{Collaborator.Correo}</td>
              <td>{Collaborator.Departamento.Nombre}</td>
              <td>{Collaborator.Telefono}</td>
              <td className='BtnBox'>
                <Link className='BtnEditar' to={`edit/${Collaborator.ID}`}><HiPencilAlt/></Link>
                <button className='BtnEliminar' value={Collaborator.ID} onClick={()=>{
                  handleDelete(Collaborator.ID)
                }}><MdDeleteForever/></button>
              </td>
            </tr> 
            )})
          }

        </tbody>

      </table>
          <Paginator count={Count} limit={Limit} handlePage={setPages} Page={Pages} />
    </div>
  )
}
