import React from 'react'
import '../../Css/Login.css'
import { AiFillLock } from 'react-icons/ai'
import LoginImg from '../../Img/LoginMenu.jpg'
import { useForm } from '../../Hooks/useForm'
import { LoginUser } from '../../db/connection'
import { useNavigate } from 'react-router-dom'
import { RolesList } from '../../Models/Roles'

export const Login = ({setUser}) => {

    const navigate = useNavigate()

    const  [formValues, handleInputChange] = useForm({Email:"",Password:""})
    const {Email, Password} = formValues;

    const handleLogin = async(e)=>{
        e.preventDefault();
        const data = await LoginUser(Email, Password)
        
        if(data.length > 0){
            let AuthUser = data[0];

           localStorage.setItem('User',JSON.stringify(data[0]))

            if(AuthUser.Role === RolesList.Admin){
                navigate("/admin")
            }
            
            if(AuthUser.Role === RolesList.User){
                navigate("/")
            }

        }else{
            alert("Error")
        }
    }


  return (
    <div className='MainLogin'>

        <div className='LoginBox'>

            <h1>Inicio de sesión</h1>
            <form className='Loginform'>
                <div className='form-box'>
                    <label>Usuario</label>
                    <input type='email' className='form-input' placeholder='Email' name='Email' value={Email} onChange={handleInputChange} required/>
                </div>
                <div className='form-box'>
                    <label>Contraseña</label>
                    <input type='password' className='form-input' placeholder='Password' name='Password' value={Password} onChange={handleInputChange} required/>
                </div>
                <button className='Btn-Nuevo loginBtn' onClick={handleLogin}> <AiFillLock className='icon'/> Iniciar sesión</button>

            </form>
        </div>
        <img className='LoginImg' src={LoginImg}/>
    </div>
  )
}
