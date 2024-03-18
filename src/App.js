import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import './App.scss';

import Index from "./pages/index/index";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import User from "./pages/User/User";
import EventForm from "./pages/EventForm/Form";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import EventEdit from "./pages/EventEdit/EventEdit";
import InscribeForm from "./pages/InscribeForm/Inscribe";
import InscribeFormUser from "./pages/InscribeUser/InscribeFormUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />} ></Route>
          <Route path="/EventForm" element={<EventForm />}></Route>
          <Route path="/eventEdit/:id" element={<EventEdit />} ></Route>
          <Route path="/inscribeForm/:id" element={<InscribeForm />}></Route>
          <Route path="/inscribeFormUser/:id" element={<InscribeFormUser />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
