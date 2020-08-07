import React, { Component } from "react";
import {  Redirect } from "react-router-dom";

 class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirected:false,
    };
    this.Logout = this.Logout.bind(this)
  }


  async Logout (e) {
    e.preventDefault();
    const username = await localStorage.getItem('username');
    const token = await localStorage.getItem('token');
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
        .then((result) => {this.setState({
          redirected:true
        })})
        .catch((error) => {
          console.log("error: " + error);
        });
     
  }


  render () {
    if(this.state.redirected){
      return(
     <Redirect to='/'/>
      )
    }
   
  return (
    <div className="navigation">
      <nav className="navbar  justify-content-between" id="navigation">
        <h3 className="navbar-brand">HabiTrack</h3>
    
          <button className="nav-link" type="button" id="navButton" onClick={this.Logout}>
            Logout
          </button>
      
      </nav>

    </div>
  );
   }
};

export default Navigation;

