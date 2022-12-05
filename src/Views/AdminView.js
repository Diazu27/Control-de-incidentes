import React from 'react'
import { Routes, Route} from "react-router-dom"


import { SideBar } from './../Components/Sidebar/SideBar';


import { IncidenteDetail } from "./../Views/Incidentes/IncidenteDetail";
import { Incidentes } from "./../Views/Incidentes/Incidentes";
import { EditarUsuario } from "./../Views/Usuario/EditarUsuario";
import { NuevoUsuario } from "./../Views/Usuario/NuevoUsuario";
import { Usuarios } from "./../Views/Usuario/Usuarios";

import { Equipments } from './EquipmentViews/Equipments';
import { NewEquipment } from './EquipmentViews/NewEquipment';
import { EditEquipment } from './EquipmentViews/EditEquipment';

export const AdminView = () => {
  return (
    <div className="App">
      <SideBar/>
      <Routes>
        <Route path="equipos" element={ <Equipments/> } />
        <Route path="equipos/new" element={ <NewEquipment/> } />
        <Route path="equipos/edit/:id" element={ <EditEquipment/> } />


        <Route path="usuarios" element={<Usuarios/>}/>
        <Route path="usuarios/new" element={ <NuevoUsuario/> } />
        <Route path="usuarios/edit/:id" element={ <EditarUsuario/> } />


        <Route path="incidentes" element={<Incidentes/>}/>

        <Route path="incidentes/:id" element={ <IncidenteDetail/> } />



      </Routes>
    </div>
  )
}
