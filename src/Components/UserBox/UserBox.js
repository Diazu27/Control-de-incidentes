import React from 'react'
import './UserBox.css'

export const UserBox = () => {
  return (
    <div className='card'>
        <div className='card-img'></div>
        <div className='card-data'>
            <label className='card-name'>
               Andrés Díaz
            </label>
            <label className='card-role'>
                Administrador
            </label>
        </div>
    </div>
  )
}
