import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  function createUser(e) {
    e.preventDefault();
    (password === confirmPassword)
      ? fetch('https://zgs-restaurant-api.herokuapp.com/api/register',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        })
        .then(data => data.json())
        .then(res => {
          if (res.status === 'success') {
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setMessage('User created succesfully, you can now login following this');
          } else {
            setMessage(res.message);
          }
        })
      : setMessage('Password dos not match, please try again.')
  }

  return (
    <>
      <Header />
      <div className='container'>
        {(!message)
          ? <div></div>
          : (message !== 'User created succesfully, you can now login following this')
            ? <div className='alert alert-danger'>{message}</div>
            : <div className='alert alert-success'>{message}
              <Link className="text-decoration-none" to="/login"> link.</Link>
            </div>
        }
        <div className='card p-5 my-5'>
          <h4 className='card-title mb-4'>Registration</h4>
          <form onSubmit={(e) => createUser(e)}>
            <div className='form-group'>
              <label htmlFor='inputName'>First name</label>
              <input
                type="text"
                name='inputName'
                className="form-control"
                onChange={e => setName(e.target.value)}
                placeholder='Enter first name'
                value={name}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='inputEmail'>Email address</label>
              <input
                type="email"
                name='inputEmail'
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter email'
                value={email}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="pass">Password</label>
              <input
                type='password'
                className='form-control'
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter password'
                value={password}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="pass">Confirm password</label>
              <input
                type='password'
                className='form-control'
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder='Repeat entered password'
                value={confirmPassword}
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

export default Register;