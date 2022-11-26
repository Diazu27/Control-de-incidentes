import React from 'react'

import { Routes, Route } from "react-router-dom"
import { SideBarUser } from '../Components/Sidebar/SideBarUser';
import { UserEquipo } from './User/UserEquipo';
import { UserIncidentDetail } from './User/UserIncidentDetail';
import { UserIncidente } from './User/UserIncidente';
import { UserNewIncident } from './User/UserNewIncident';

export const UserView = () => {
  return (
    <div className="App">
      <SideBarUser/>
      <Routes>
        <Route path="/equipos" element={ <UserEquipo/> } />
        <Route path="/incidentes" element={<UserIncidente/>}/>
        <Route path="/incidentes/:id" element={<UserIncidentDetail/>}/>
        <Route path="/incidentes/new" element={<UserNewIncident/>}/>

      </Routes>
    </div>
  )
}
