import React, { useEffect, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { getUserAuth, LogoutUserAuth } from '../../db/localStorage'
import './UserBox.css'

export const UserBox = () => {

  const navigate = useNavigate()

  const [User, setUser] = useState({})
  useEffect(() => {
    setUser(getUserAuth())
  }, [])
  
  const handleLogOut = ()=>{
    LogoutUserAuth();
    navigate("/")
  }


  return (
    <div className='card'>
        <div className='card-img' onClick={handleLogOut}>
          <BiLogOut/>
        </div>
        <div className='card-data'>
            <label className='card-name'>
               {User.Nombre +" "+ User.Apellido}
            </label>
            <label className='card-role'>
                {User.Role === 1? "Administrador":"Usuario"}
            </label>
        </div>
    </div>
  )
}
