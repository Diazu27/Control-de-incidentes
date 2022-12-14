import {HiOutlineDesktopComputer} from 'react-icons/hi'

import './Sidebar.css'
import { UserBox } from '../UserBox/UserBox'
import { NavLink } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'


export const SideBarUser = () => {
  return (
    <div className='Sidebar'>
    <div className='SidebarTop'>
      
    </div>

    <div className='SidebarCont'>
        <NavLink className={({isActive})=> isActive? 'SidebarBTN BtnActive':'SidebarBTN'} to='/client/equipos'>
          <HiOutlineDesktopComputer className='SideIcon'/>Mis equipos
        </NavLink>
        <NavLink className={({isActive})=> isActive? 'SidebarBTN BtnActive':'SidebarBTN'} to='/client/incidentes'>
          <FiAlertTriangle className='SideIcon'/>Mis incidentes
        </NavLink>
    </div>


    <div className='SidebarDOWN'>
      <UserBox/>
    </div>
  </div>
  )
}
