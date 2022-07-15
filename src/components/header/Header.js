import React from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Restaurant Manager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
      </div>
    </nav>
  )
}

export default Header;