import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function NavLogin({ token, logout }) {
  const [logedin, setLogedin] = useState(false);

  useEffect(() => {
    (token)
      ? setLogedin(true)
      : setLogedin(false)
  }, [token]);

  return (
    <>
      {(logedin)
        ? <li className="nav-item">
          <span className="navbar-brand" onClick={() => {
            setLogedin(false)
            logout()
            }} >Logout</span>
        </li>
        : <>
          <li className="nav-item">
            <Link className="navbar-brand" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="navbar-brand" to="/register">Register</Link>
          </li>
        </>}
    </>
  )
}

export default NavLogin