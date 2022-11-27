import React, { useEffect, useState } from 'react'
import '../../Css/BaseStyles.css';
import {HiOutlineDesktopComputer,HiPlus,HiPencilAlt} from 'react-icons/hi'
import {MdDeleteForever} from 'react-icons/md'
import { Link } from 'react-router-dom';
import { deleteEquipos, getEquiposByRange, getEquiposFree } from '../../db/connection';
import { Confirm } from '../../Components/Alert/Confirm';
import { AlertReload } from '../../Components/Alert/AlertReload';
import { Paginator } from '../../Components/Paginator/Paginator';



export const AsignarEquipo = () => {

  const [dataEquipos, setDataEquipos] = useState([])
  const [Pages, setPages] = useState(0)
  const [Count, setCount] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [UserSelected, setUserSelected] = useState({})
  const [EquiposFree, setEquiposFree] = useState([])
  
  const [Deleted, setDeleted] = useState({isDeleted: false, id:0, Confirm: false})
 
  useEffect(()=>{
    const getData = async()=>{
      let {data,count} = await getEquiposByRange(Pages, Pages+Limit);
      
      setCount(count)
      setDataEquipos(data)
    }
    getData()
  },[])

  useEffect(()=>{
    const getData = async()=>{
        let {data} = await getEquiposFree();
        setEquiposFree(data)
    }
    getData()
  },[])

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
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Asignar equipos</h1>
        <Link to="new" className='Btn-Nuevo'> <HiPlus className='icon'/> Guardar</Link>
      </div>

      <div className='ChartBox'> 
        <div className='form-row'>
              <div className='form-box'>
                  <label>ID de Usuario</label>
                  <input type='text' className='form-input' placeholder='Nombre' name='Nombre' value={1} onChange={1}/>
              </div>
              <div className='form-box'>
                  <label>Equipo</label>
                  <select className='form-input' name='ID_Equipo' value={0} onChange={0}>
                  <option value="">SELECCIONE...</option>
                  {
                    EquiposFree.map((Data)=>{
                    return <option key={Data.ID} value={parseInt(Data.ID)}>{Data.Tipo+" - "+Data.Marca + " " +Data.Modelo}</option>
                    })
                  } 
                </select>
              </div>
          </div>
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
