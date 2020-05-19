import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      username: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.surname]: e.target.value,
      [e.target.username]: e.target.value,
      [e.target.password]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({ toLogin: true });
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
    }).catch((error) => {
      console.log("Error:", error);
    });

    e.preventDefault();
    // this.props.loadFunction(this.state);
  };

  render() {
    if (this.state.toLogin === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid" id="HomePage">
        <div className="row">
          <div className="col-lg-3" id="asideArea"></div>
          <div className="col-lg-6">
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
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-3" id="asideArea"></div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
