import {HiOutlineDesktopComputer, HiOutlineUser, } from 'react-icons/hi'
import {FiAlertTriangle} from 'react-icons/fi'

import './Sidebar.css'
import { UserBox } from '../UserBox/UserBox'
import { NavLink } from 'react-router-dom'


export const SideBar = () => {
  return (
    <div className='Sidebar'>
    <div className='SidebarTop'>
    </div>

    <div className='SidebarCont'>
        <NavLink className={({isActive})=> isActive? 'SidebarBTN BtnActive':'SidebarBTN'} to='equipos'>
          <HiOutlineDesktopComputer className='SideIcon'/>Equipos
        </NavLink>
        <NavLink className={({isActive})=> isActive? 'SidebarBTN BtnActive':'SidebarBTN'}  to='usuarios'>
        <HiOutlineUser className='SideIcon'/> Usuarios
        </NavLink>
        <NavLink className={({isActive})=> isActive? 'SidebarBTN BtnActive':'SidebarBTN'}  to='incidentes'>
          <FiAlertTriangle className='SideIcon'/> Incidentes
        </NavLink>
    </div>


    <div className='SidebarDOWN'>
      <UserBox/>
    </div>
  </div>
  )
}
