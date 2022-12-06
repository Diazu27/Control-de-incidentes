
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminView } from './Views/AdminView';
import { UserView } from './Views/UserView';
import { Login } from './Views/Login/Login';

function App() {
  return (
    <div>
      <Routes>
      <Route path="admin//*" element={<AdminView />} />
      <Route path="/" element={<Login/>} />
      <Route path="client//*" element={<UserView/>} />
    </Routes>
    </div>
  );
}

export default App;
