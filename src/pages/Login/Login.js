import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; 
import axios from 'axios';
import './Login.scss';

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3200/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data) {
        login(response.data.access, response.data.refresh, response.data.userId);

        const userRole = response.data.role;

        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'user') {
          navigate('/user');
        }

        const msg = response.data.msg || "Login successful";

        setResponseMessage(msg);
        setError(""); 
      } else {
        console.error('Error: Access token not present in the server response');
        setResponseMessage("");
        setError("Error logging in");
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setResponseMessage("");
      setError(error.response ? error.response.data.msg : "Error logging in");
    }
  };

  return (
    <div className="container-login">
    <div className="content-login">
      <div className="card-login">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group-login">
            <label htmlFor="email">Usuario:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: "1px solid black"}}
            />
          </div>
          <div className="form-group-login">
            <label htmlFor="password">Contraseña:</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <VisibilityOffIcon onClick={() => setShowPassword(false)} />
              ) : (
                <VisibilityIcon onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          <div className="form-actions-login">
            <button type="submit">Ingresar</button>
            <Link to="/">
              <button type="button">Atrás</button>
            </Link>
          </div>
        </form>
        {responseMessage && <p className="response-message-login">{responseMessage}</p>}
        {error && <p className="error-message-login">{error}</p>}
      </div>
    </div>
    </div>
  );
};

export default Login;
