import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password){
      alert("Please enter username and password!")
      navigate('/login')
      return
    }
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      //alert('Login successful');
      onLogin();
      navigate('/notes')
    } catch (err) {
      alert('User does not exist/ wrong username or password');
      navigate('/login')
    }
  };
  const register = async ()=> {
    navigate('/register')
  }
  return (
   <div className='container mt-3' style={{width: "600px"}}>
    <div className="card d-flex align-items-center justify-content-center mt-3" >
      <form onSubmit={handleSubmit} className='card-body'>
          <center>Login</center>
          <div className="mb-3 form-outline" >
            <label>Username</label>
            <input className="form-control" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          </div>
          <div className="mb-3 form-outline">
            <label>Password</label>
            <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary mb-3">
              Login
            </button>
          </div>
          
      </form>
    <div className="d-grid mb-3">
      <button onClick={register} className="btn btn-secondary">
        Register
      </button>
    </div>
   </div>
   </div>
  );
};

export default Login;
