import React, { Component } from "react";
import { Link } from "react-router-dom";

 class Navigation extends Component {


  async Logout (e) {
    e.preventDefault();
    const username = await localStorage.getItem('username');
    const token = await localStorage.getItem('token');
    console.log(username)  
    console.log(token) 
      const data = {
        username: username,
        token:token
      };
        fetch("api/logout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
       
          if (!response.ok) { console.log(response)
            throw new Error(response.status)}
          else  {   
            delete localStorage.username;
            delete localStorage.token
             return response.json()}
        })
        .catch((error) => {
          console.log("error: " + error);
        });
     
  }


  render () {
   
  return (
    <div className="navigation">
      <nav className="navbar  justify-content-between" id="navigation">
        <h3 className="navbar-brand">HabiTrack</h3>
        <Link to="/" className="nav-link">
          <button type="button" id="navButton" onClick={this.Logout}>
            Logout
          </button>
        </Link>
        
      </nav>

    </div>
  );
   }
};

export default Navigation;

