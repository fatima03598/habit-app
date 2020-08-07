import React from 'react'
import { Link } from "react-router-dom";




function NavBar() {

 const signed = () => {
 return (localStorage.getItem('token') && localStorage.getItem('username')) ? true : false
  }
    return (
        <div className="navigation">
          { !signed() ? 
      <nav className="navbar  justify-content-between" id="navigation">
      <Link to="/" className="nav-link  ">
        <h3 className="navbar-brand navbar-left">HabiTrack</h3>
        </Link>
       <div  className="navButtons">
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
:  <nav className="navbar  justify-content-between" id="navigation">
<Link to="/" className="nav-link  ">
  <h3 className="navbar-brand navbar-left">HabiTrack</h3>
  </Link>
 <div  class="navButtons">
  <Link to="/dashboard" className="nav-link  ">
    <button type="button" id="navButton" >
      Dashboard
    </button>
  </Link>
  </div>
</nav>}
    </div>
    )
}

export default NavBar
