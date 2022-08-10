import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

async function loginUser(credentials) {
  return fetch('http://127.0.0.1:8000/api/login',
    {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
}

function Login() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();

  useEffect(() => {
    if (token) return nav("/restaurants");
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginInfo = await loginUser({ email, password });
    if ((loginInfo['user']['admin']) && loginInfo['user']['admin'] == 1) {
      setToken(loginInfo['authorisation']['token']);
      localStorage.setItem('token', loginInfo['authorisation']['token']);
      localStorage.setItem('admin', loginInfo['authorisation']['token']);
    } else {
      setToken(loginInfo['authorisation']['token']);
      localStorage.setItem('token', loginInfo['authorisation']['token']);
    }
  }

  return (
    <>
      <Header />
      <div className='container'>
        <div className='card p-5 my-5'>
          <h4 className='card-title mb-4'>Enter your credentials to login</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='inputEmail'>Email address</label>
              <input
                type="email"
                name='inputEmail'
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter email'
              />
              <small className='form-text text-muted'>We'll never share your email with anyone else.</small>
            </div>
            <div className='form-group'>
              <label htmlFor="pass">Password</label>
              <input
                type='password'
                className='form-control'
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
              />
            </div>
            <br />
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;