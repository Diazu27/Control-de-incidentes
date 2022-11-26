import {HiOutlineDesktopComputer} from 'react-icons/hi'

import './Sidebar.css'
import { UserBox } from '../UserBox/UserBox'
import { NavLink } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'


export const SideBarUser = () => {
  return (
    <div className='Sidebar'>
    <div className='SidebarTop'>
      <h1>Logo</h1>
    </div>

    <div className='SidebarCont'>
        <NavLink className={({isActive})=> isActive? 'SidebarBTN BtnActive':'SidebarBTN'} to='equipos'>
          <HiOutlineDesktopComputer className='SideIcon'/>Mis equipos
        </NavLink>
        <NavLink className={({isActive})=> isActive? 'SidebarBTN BtnActive':'SidebarBTN'} to='incidentes'>
          <FiAlertTriangle className='SideIcon'/>Mis incidentes
        </NavLink>
    </div>


    <div className='SidebarDOWN'>
      <UserBox/>
    </div>
  </div>
  )
}
