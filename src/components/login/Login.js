import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function loginUser(credentials) {
  return fetch('http://127.0.0.1:8000/api/login',
    {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
}

function Login() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();

  useEffect(() => {
    if (token) return nav("/restaurants");
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginInfo = await loginUser({ email, password });
    setToken(loginInfo["authorisation"]["token"]);
    localStorage.setItem('token', loginInfo["authorisation"]["token"]);
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <small className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login;