import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(username=="" || password=="" || email==""){
      alert("Please enter email, username and password")
      navigate('/login')
      return
    }
    try {
      await axios.post('http://localhost:3000/register', { username, password , email});
      alert('Registration successful');
      navigate('/login')
    } catch (err) {
      console.log()
      alert('Error registering user');
      navigate('/register')
    }
  };
  const login = async ()=> {
    navigate('/login')
  }

  return (
    <div className='container mt-3' style={{width: "600px"}}>
    <div className="card d-flex align-items-center justify-content-center mt-3" >
    <form onSubmit={handleSubmit} className='card-body'>
        <center>Register</center>
        <div className="mb-3 form-outline" >
          <label>Username</label>
          <input className="form-control" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        </div>
        <div className="mb-3 form-outline">
          <label>Email address</label>
          <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className="mb-3 form-outline">
          <label>Password</label>
          <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
     
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary mb-3">
            Sign Up
          </button>
        </div>
    </form>
    <div className="d-grid ">
      <button onClick={login} className="btn btn-secondary  mb-3">
        Login
      </button>
    </div>
   </div>
    </div>
  );
};

export default Register;
