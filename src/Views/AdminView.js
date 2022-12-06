import React from 'react'
import { Routes, Route} from "react-router-dom"


import { SideBar } from './../Components/Sidebar/SideBar';

import { Equipments } from './EquipmentViews/Equipments';
import { NewEquipment } from './EquipmentViews/NewEquipment';
import { EditEquipment } from './EquipmentViews/EditEquipment';
import { Incidents } from './Incidents/Incidents';
import { IncidentDetail } from './Incidents/IncidentDetail';
import { Collaborators } from './Collaborator/Collaborators';
import { NewCollaborator } from './Collaborator/NewCollaborator';
import { EditCollaborator } from './Collaborator/EditCollaborator';

export const AdminView = () => {
  return (
    <div className="App">
      <SideBar/>
      <Routes>
        <Route path="equipos" element={ <Equipments/> } />
        <Route path="equipos/new" element={ <NewEquipment/> } />
        <Route path="equipos/edit/:id" element={ <EditEquipment/> } />

        <Route path="usuarios" element={<Collaborators/>}/>
        <Route path="usuarios/new" element={ <NewCollaborator/> } />
        <Route path="usuarios/edit/:id" element={ <EditCollaborator/> } />

        <Route path="incidentes" element={<Incidents/>}/>
        <Route path="incidentes/:id" element={ <IncidentDetail/> } />

      </Routes>
    </div>
  )
}
