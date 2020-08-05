import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import alert from "alert";
import NavBar from "../Components/NavBar";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      data: [],
      toDashboard: false,
      authenticated:false
    };
  }
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password_digest: this.state.password,
    };
    fetch("api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        console.log(data);
        const username = data.userInfo.username
        const token = data.userInfo.token
        localStorage.setItem("username", username  );
        localStorage.setItem("token", token  );
        
       
      })
      .then(() => {
        this.setState({ data: data.userInfo, toDashboard: true, authenticated:true });
      })
      .catch((error) => {
        console.log("error: " + error);
        console.log("user not found");
        window.alert("wrong username and password");
        this.setState({ requestFailed: true });
      });
  
    // this.props.loadFunction(this.state);
  };

  render() {
    if (this.state.toDashboard === true) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { data: this.state.data },
          }}
        />
      );
    } 
    return (
      <div  id="HomePage">
        <NavBar/>  
            <div className="App-body" id="formArea">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleUsername}
                    required
                  />
                </div>
                <div className="form-group row">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handlePassword}
                    autoComplete="on"
                  />
                </div>
                <button type="submit" className="loginButton">
                  Login
                </button>
              </form>
            </div>
          </div>
       
    );
  }
}
export default LoginPage;
