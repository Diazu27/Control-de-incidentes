import React, { useEffect, useState } from 'react'
import '../../Css/BaseStyles.css';
import {HiOutlineDesktopComputer,HiPlus,HiPencilAlt} from 'react-icons/hi'
import {MdDeleteForever} from 'react-icons/md'
import { Link } from 'react-router-dom';
import { deleteEquipos, getEquiposByRange } from '../../db/connection';
import { Confirm } from '../../Components/Alert/Confirm';
import { AlertReload } from '../../Components/Alert/AlertReload';
import { Paginator } from '../../Components/Paginator/Paginator';



export const Equipos = () => {

  const [dataEquipos, setDataEquipos] = useState([])
  const [Pages, setPages] = useState(0)
  const [Count, setCount] = useState(0);
  const [Limit, setLimit] = useState(4);
  
  const [Deleted, setDeleted] = useState({isDeleted: false, id:0, Confirm: false})
 
  useEffect(()=>{
    const getData = async()=>{
      let {data,count} = await getEquiposByRange(Pages, Pages+Limit);
      setCount(count)
      setDataEquipos(data)
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


      {Deleted.Confirm? <Confirm msg='¿Seguro que quiere eliminar el equipo?' ID={Deleted.id} Confirm={setDeleted} handleDelete={deleteEquipos}/>: ''}  
      {Deleted.isDeleted? <AlertReload msg='Equipo Eliminado Correctamente' handleState={setDeleted} /> : '' } 

      <div className='NavView'>
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Equipos</h1>
        <Link to="new" className='Btn-Nuevo'> <HiPlus className='icon'/> Nuevo Equipo </Link>
      </div>

      <div className='ChartBox'>
        
      </div>

      <table className='Table'>
        <thead className='TableHead'>
          <tr>
            <th className='IDColumn'>ID</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Modelo</th>
            <th>Serial</th>
            <th>IP</th>
            <th>Opciones</th>
          
          </tr>
        </thead>
        <tbody>

          {
           dataEquipos.map((equipo, i)=>{
            return (
              <tr key={i}>
              <td className='IDColumn'>{equipo.ID}</td>
              <td>{equipo.Marca}</td>
              <td>{equipo.Tipo}</td>
              <td>{equipo.Modelo}</td>
              <td>{equipo.Serial}</td>
              <td>{equipo.IP}</td>
              <td className='BtnBox'>
                <Link className='BtnEditar' to={`edit/${equipo.ID}`}><HiPencilAlt/></Link>
                <button className='BtnEliminar' value={equipo.ID} onClick={()=>{
                  handleDelete(equipo.ID)
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
