import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import './App.scss';

import Index from "./pages/index/index";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
