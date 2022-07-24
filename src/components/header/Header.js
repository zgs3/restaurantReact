import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import NavLogin from './navLogin/NavLogin';

function Header() {
  const [token, _] = useState(localStorage.getItem('token'));
  const [admin, __] = useState(localStorage.getItem('admin'));
  const nav = useNavigate();

  const removeToken = () => {
    if (admin) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    } else localStorage.removeItem('token');
  }

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
    <nav className="navbar justify-content-start navbar-dark bg-dark bg-gradient sticky-top py-0">
      <div className='d-flex justify-content-between align-items-center w-100'>
        <span className='navTitle ms-2 me-5'>WhatToEat?</span>
        <div className='flex-grow-1'>
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <Link className={(window.location.pathname.slice(1) == 'restaurants' ? 'navbar-brand activeNav' : 'navbar-brand')} to="/restaurants">Restaurants</Link>
            </li>
            <li className="nav-item">
              <Link className={(window.location.pathname.slice(1) == 'dishes' ? 'navbar-brand activeNav' : 'navbar-brand')} to="/dishes">Dishes</Link>
            </li>
          </ul>
        </div>
        <div className='d-flex align-items-center'>
          <ul className="navbar-nav flex-row">
            <NavLogin token={token} logout={logout} />
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Header;