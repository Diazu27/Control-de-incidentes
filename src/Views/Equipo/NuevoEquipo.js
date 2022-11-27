import {HiOutlineDesktopComputer,HiPlus} from 'react-icons/hi'


import { tiposEquipo } from '../../Models/TiposEquipo'
import { useForm } from '../../Hooks/useForm'
import {SistemasOperativos}  from '../../Models/SistemasOperativos.js'
import { useState } from 'react'
import { insertEquipos } from '../../db/connection'
import { Alert } from '../../Components/Alert/Alert'


export const NuevoEquipo = () => {

  const [Error, setError] = useState({
    IsError: false,
    msg: ""
  });

  const [IsComplete, setIsComplete] = useState(false)

  const InitialData = {
    Marca: '',
    Tipo:'',
    Modelo:'',
    Serial:'',
    MAC:'',
    IP:'',
    SO:'',
  }

  const  [formValues, handleInputChange,validateForm ] = useForm(InitialData)
  const {Marca, Tipo, Modelo, Serial, MAC, IP, SO} = formValues;

  const handleSubmit = async()=>{
    const {IsError, msg} = validateForm()
    
    if(IsError){
      setError({IsError,msg})
    }else{
      setError({IsError})
      const data = await insertEquipos(formValues);

      if(data){
        setIsComplete(true)
      }
    }
  }


  return (
    <div className='mainBox'>

      {
        IsComplete ? <Alert msg='Equipo creado correctamente' path='/admin/equipos'/> : ""
      }
     
      <div className='NavView'>
        <h1 className='title'><HiOutlineDesktopComputer className='icon'></HiOutlineDesktopComputer> Nuevo equipo</h1>
        <button className='Btn-Nuevo' onClick={handleSubmit}> <HiPlus className='icon'/> Guardar</button>
      </div>

      <form className='form'>
        {
          Error.IsError ? <div className='FormAlert'>{Error.msg}</div> : ""
        }

        <div className='form-row'>
            <div className='form-box'>
                <label>Marca</label>
                <input type='text' className='form-input' placeholder='Marca' name='Marca' value={Marca} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Tipo</label>
                <select className='form-input' name='Tipo' value={Tipo} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
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
                <input type='text' className='form-input' placeholder='Modelo' name='Modelo' value={Modelo} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>Serial</label>
                <input type='text' className='form-input' placeholder='Serial' name='Serial' value={Serial} onChange={handleInputChange}/>
            </div>
            
        </div>
        <div className='form-row'>
            <div className='form-box'>
                <label>MAC</label>
                <input type='text' className='form-input' placeholder='Marca' name='MAC' value={MAC} onChange={handleInputChange}/>
            </div>
            <div className='form-box'>
                <label>IP</label>
                <input type='text' className='form-input' placeholder='IP' name='IP' value={IP} onChange={handleInputChange}/>
            </div>   
        </div>

        <div className='form-row'>
            <div className='form-box'>
                <label>SO</label>
                <select className='form-input' name='SO' value={SO} onChange={handleInputChange}>
                  <option value="">SELECCIONE...</option>
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
