import React from 'react'
import { AiFillLock } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { RolesList } from '../../Models/Roles'
import '../../Css/Login.css'
import { LoginWithEmailAndPassword } from '../../db/connection'
import LoginImg from '../../Img/LoginMenu.jpg'
import { useForm } from '../../Hooks/useForm'

export const Login = () => {

    const navigate = useNavigate()

    const  [LoginformValues, handleInputChange] = useForm({Email:"",Password:""})
    const {Email, Password} = LoginformValues;

    const handleLogin = async(e)=>{
        e.preventDefault();
        const AuthUser = await LoginWithEmailAndPassword(Email, Password)     
        if(AuthUser.length > 0){
           localStorage.setItem('User',JSON.stringify(AuthUser[0]))
            if(AuthUser[0].Role === RolesList.Admin)navigate("/admin")
            if(AuthUser[0].Role === RolesList.User) navigate("/client")
            
        }else alert("Error")
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
        <img className='LoginImg' src={LoginImg} alt="LoginImage"/>
    </div>
  )
}
