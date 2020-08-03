import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../Components/NavBar";
class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      username: "",
      password: "",
      repassword: "",
      tologin: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.surname]: e.target.value,
      [e.target.username]: e.target.value,
      [e.target.password]: e.target.value,
      [e.target.repassword]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    if (this.state.password === this.state.repassword) {
      if (this.state.password.length < 6 || this.state.password.length > 10) {
        alert("the password must be between 6 - 10 character");
      } else {
        const data = {
          name: this.state.name,
          surname: this.state.surname,
          username: this.state.username,
          password_digest: this.state.password,
        };
        fetch("api/signup", {
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
          .catch((error) => {
            console.log("Error:", error);
            alert("username already in use");
          });
        this.setState({ toLogin: true });
        e.preventDefault();
      }
    } else {
      alert("the password is not the same");
    }
  };
  render() {
    if (this.state.toLogin === true) {
      return <Redirect to="/" />;
    }
    return (
      <div id="HomePage">
        <NavBar/>

            <div className="App-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="surname">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="surname"
                      value={this.state.surname}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete="on"
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Password should be between 6 - 10 character
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="re-password">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="repassword"
                    value={this.state.repassword}
                    onChange={this.handleChange}
                    autoComplete="on"
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Password should be between 6 - 10 character
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  id="signUpbutton"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
    );
  }
}
export default RegisterPage;
