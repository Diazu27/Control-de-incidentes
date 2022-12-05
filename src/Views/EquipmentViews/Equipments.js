import React, { useEffect, useState } from 'react'
import {HiOutlineDesktopComputer,HiPlus,HiPencilAlt} from 'react-icons/hi'
import {MdDeleteForever} from 'react-icons/md'
import { Link } from 'react-router-dom';

import '../../Css/BaseStyles.css';
import { Confirm } from '../../Components/Alert/Confirm';
import { AlertReload } from '../../Components/Alert/AlertReload';
import { Paginator } from '../../Components/Paginator/Paginator';
import { deleteEquipment, getEquipmentsByRange } from '../../db/connection';

export const Equipments = () => {

  const [EquipmentData, setEquipmentData] = useState([])
  const [EquipmentDeleted, setEquipmentDeleted] = useState({isDeleted: false, id:0, Confirm: false})
  
  const [Pages, setPages] = useState(0)
  const [Count, setCount] = useState(0);
  const Limit = 4;

  useEffect(()=>{
    const getApiData = async()=>{
      let {data,count} = await getEquipmentsByRange(Pages, Pages+Limit);
      setCount(count)
      setEquipmentData(data)
    }
    getApiData()
  },[Pages])

  const handleDelete = (EquipmentID) =>{setEquipmentDeleted({Confirm:true,id: EquipmentID})}

  return (
    <div className='mainBox'>

      {EquipmentDeleted.Confirm? <Confirm msg='¿Seguro que quiere eliminar el equipo?' ID={EquipmentDeleted.id} Confirm={setEquipmentDeleted} handleDelete={deleteEquipment}/>: ''}  
      {EquipmentDeleted.isDeleted? <AlertReload msg='Equipo Eliminado Correctamente' handleState={setEquipmentDeleted} /> : '' } 

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
           EquipmentData.map((Equipment, i)=>{
            return (
              <tr key={i}>
                <td className='IDColumn'>{Equipment.ID}</td>
                <td>{Equipment.Marca}</td>
                <td>{Equipment.Tipo}</td>
                <td>{Equipment.Modelo}</td>
                <td>{Equipment.Serial}</td>
                <td>{Equipment.IP}</td>
                <td className='BtnBox'>
                  <Link className='BtnEditar' to={`edit/${Equipment.ID}`}><HiPencilAlt/></Link>
                  <button className='BtnEliminar' value={Equipment.ID} onClick={()=>{handleDelete(Equipment.ID)}}><MdDeleteForever/></button>
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
