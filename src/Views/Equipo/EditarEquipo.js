import {HiOutlineDesktopComputer,HiPlus} from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getEquiposByID, UpdateEquipos } from '../../db/connection';
import { Alert } from '../../Components/Alert/Alert';
import { tiposEquipo } from '../../Models/TiposEquipo';
import { SistemasOperativos } from '../../Models/SistemasOperativos';


export const EditarEquipo = () => {
  
  const [Error, setError] = useState({
    IsError: false,
    msg: ""
  });
  
  const [IsComplete, setIsComplete] = useState(false)
  const params = useParams()
  const [Data, setData] = useState({
    Marca: '',
    Tipo:'',
    Modelo:'',
    Serial:'',
    MAC:'',
    IP:'',
    SO:'',
  })
  
  useEffect(() => {
    const getData = async()=>{
      let equipo = await getEquiposByID(params.id)

      setData({
        Marca: equipo[0].Marca,
        Tipo:equipo[0].Tipo,
        Modelo:equipo[0].Modelo,
        Serial:equipo[0].Serial,
        MAC:equipo[0].MAC,
        IP:equipo[0].IP,
        SO:equipo[0].SO,
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
      const data = await UpdateEquipos(Data,params.id);

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
        IsComplete ? <Alert msg='Equipo editado correctamente' path='/admin/equipos' /> : ""
      }
     
      <div className='NavView'>
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Editar equipo</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {
          Error.IsError ? <div className='FormAlert'>{Error.msg}</div> : ""
        }

        <div className='form-row'>
            <div className='form-box'>
                <label>Marca</label>
                <input type='text' className='form-input' placeholder='Marca' name='Marca' value={Data.Marca} onChange={handleInputChange} />
            </div>
            <div className='form-box'>
                <label>Tipo</label>
                <select className='form-input' name='Tipo' value={Data.Tipo} onChange={handleInputChange}>
                  {
                    tiposEquipo.map((equipo,i)=>{
                      return <option key={i} value={equipo}>{equipo}</option>                      
                    })
                  } 
                </select>
            </div>        
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>Modelo</label>
                <input type='text' className='form-input' placeholder='Modelo' name='Modelo' value={Data.Modelo} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Serial</label>
                <input type='text' className='form-input' placeholder='Serial' name='Serial' value={Data.Serial} onChange={handleInputChange}/>
            </div>
            
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>MAC</label>
                <input type='text' className='form-input' placeholder='MAC' name='MAC' value={Data.MAC} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>IP</label>
                <input type='text' className='form-input' placeholder='IP' name='IP' value={Data.IP} onChange={handleInputChange}/>
            </div>   
        </div>

        <div className='form-row'>
            <div className='form-box'>
                <label>SO</label>
                <select className='form-input' name='SO' value={Data.SO} onChange={handleInputChange}>
                  {
                    SistemasOperativos.map((so,i)=>{
                      return <option key={i} value={so}>{so}</option>                      
                    })
                  } 
                </select>
            </div> 
        </div>
      </form>
    </div>
  )
}
