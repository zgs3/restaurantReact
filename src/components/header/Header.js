import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [token, _] = useState(localStorage.getItem('token'));
  const nav = useNavigate();

  const removeToken = () => {
    localStorage.removeItem('token');
  };

  function logout() {
    fetch('http://127.0.0.1:8000/api/logout',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then(removeToken())
      .then(nav("/login"))
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Restaurant Manager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <div className='d-flex justify-content-between w-100'>
            <div className='d-flex'>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className={(window.location.pathname.slice(1) == 'home' ? 'navbar-brand activeNav' : 'navbar-brand')} to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={(window.location.pathname.slice(1) == 'restaurants' ? 'navbar-brand activeNav' : 'navbar-brand')} to="/restaurants">Restaurants</Link>
                </li>
                <li className="nav-item">
                  <Link className={(window.location.pathname.slice(1) == 'dishes' ? 'navbar-brand activeNav' : 'navbar-brand')} to="/dishes">Dishes</Link>
                </li>
              </ul>
            </div>
            <div className='d-flex'>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="navbar-brand" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="navbar-brand" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <button className="navbar-brand" onClick={() => logout()} >Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Header;