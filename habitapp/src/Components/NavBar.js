import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="navigation">
      <nav className="navbar  justify-content-between" id="navigation">
      <Link to="/" className="nav-link  ">
        <h3 className="navbar-brand navbar-left">HabiTrack</h3>
        </Link>
       <div  class="navButtons">
        <Link to="/login" className="nav-link  ">
          <button type="button" id="navButton" >
            Login
          </button>
        </Link>
        <Link to="/register" className="nav-link ">
          <button type="button" id="navButton" >
            Register
          </button>
        </Link>
        </div>
      </nav>
    </div>
    )
}

export default NavBar
