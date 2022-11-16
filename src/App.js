
import { Routes, Route } from "react-router-dom"
import './App.css';
import { SideBar } from './Components/Sidebar/SideBar';
import { EditarEquipo } from "./Views/Equipo/EditarEquipo";
import { Equipos } from './Views/Equipo/Equipos';
import { NuevoEquipo } from "./Views/Equipo/NuevoEquipo";
import { EditarUsuario } from "./Views/Usuario/EditarUsuario";
import { NuevoUsuario } from "./Views/Usuario/NuevoUsuario";
import { Usuarios } from "./Views/Usuario/Usuarios";
//import './Css/bootstrap.min.css'



function App() {
  return (
    <div className="App">
      <SideBar/>
      <Routes>
        <Route path="/equipos" element={ <Equipos/> } />
        <Route path="equipos/new" element={ <NuevoEquipo/> } />
        <Route path="equipos/edit/:id" element={ <EditarEquipo/> } />


        <Route path="/usuarios" element={<Usuarios/>}/>
        <Route path="usuarios/new" element={ <NuevoUsuario/> } />
        <Route path="usuarios/edit/:id" element={ <EditarUsuario/> } />
      </Routes>
    </div>
  );
}

export default App;
