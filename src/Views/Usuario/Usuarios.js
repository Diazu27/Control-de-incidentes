import React, { useEffect, useState } from 'react'
import '../../Css/BaseStyles.css';
import {HiPlus,HiPencilAlt} from 'react-icons/hi'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {MdDeleteForever} from 'react-icons/md'
import { Link } from 'react-router-dom';
import { Confirm } from '../../Components/Alert/Confirm';
import { AlertReload } from '../../Components/Alert/AlertReload';
import { Paginator } from '../../Components/Paginator/Paginator';
import { deleteUsuario, getUsuarioByRange } from '../../db/connection';



export const Usuarios = () => {

  const [dataUsuarios, setDataUsuarios] = useState([])
  const [Pages, setPages] = useState(0)
  const [Count, setCount] = useState(0);
  const [Limit, setLimit] = useState(4);
  
  const [Deleted, setDeleted] = useState({isDeleted: false, id:0, Confirm: false})
 
  useEffect(()=>{
    const getData = async()=>{
      let {data,count} = await getUsuarioByRange(Pages, Pages+Limit);
      setCount(count)
      setDataUsuarios(data)
    }
    getData()
  },[Pages,Deleted.isDeleted])

  const handleDelete = (id) =>{
    setDeleted({
      Confirm:true,
      id: id
    })

  }


  return (
    <div className='mainBox'>


      {Deleted.Confirm? <Confirm msg='¿Seguro que quiere eliminar el Usuario?' ID={Deleted.id} Confirm={setDeleted} handleDelete={deleteUsuario}/>: ''}  
      {Deleted.isDeleted? <AlertReload msg='Usuario Eliminado Correctamente' handleState={setDeleted} /> : '' } 

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
           dataUsuarios.map((Usuario, i)=>{
            return (
              <tr key={i}>
              <td className='IDColumn'>{Usuario.ID}</td>
              <td>{Usuario.Nombre}</td>
              <td>{Usuario.Apellido}</td>
              <td>{Usuario.Correo}</td>
              <td>{Usuario.Departamento}</td>
              <td>{Usuario.Telefono}</td>
              <td className='BtnBox'>
                <Link className='BtnEditar' to={`edit/${Usuario.ID}`}><HiPencilAlt/></Link>
                <button className='BtnEliminar' value={Usuario.ID} onClick={()=>{
                  handleDelete(Usuario.ID)
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
