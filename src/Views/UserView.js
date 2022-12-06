import React from 'react'

import { Routes, Route } from "react-router-dom"
import { SideBarUser } from '../Components/Sidebar/SideBarUser';
import { UserEquipment } from './User/UserEquipment';
import { UserIncident } from './User/UserIncident';
import { UserIncidentDetail } from './User/UserIncidentDetail';
import { UserNewIncident } from './User/UserNewIncident';

export const UserView = () => {
  return (
    <div className="App">
      <SideBarUser/>
      <Routes>
        <Route path="/equipos" element={ <UserEquipment/> } />
        <Route path="/incidentes" element={<UserIncident/>}/>
        <Route path="/incidentes/:id" element={<UserIncidentDetail/>}/>
        <Route path="/incidentes/new" element={<UserNewIncident/>}/>
      </Routes>
    </div>
  )
}
