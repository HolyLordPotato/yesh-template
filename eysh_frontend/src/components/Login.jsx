import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('/auth/login', { phoneNumber: phone.trim() });
      localStorage.setItem('token', res.data.token);
      navigate('/subjects');
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;