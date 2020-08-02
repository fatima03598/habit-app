import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
//components

//containers
import RegisterPage from "./Containers/RegisterPage";
import LoginPage from "./Containers/LoginPage";
import PrivateRoute from "./Components/PrivateRoute";
import LoadingPage from "./Components/LoadingPage";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     authenticated:false
    };
  }

// componentDidMount () {
//   const id = localStorage.getItem('id')
//   console.log(id)
//   if(id === 2) {
//     console.log(id)
//   this.setState({
//     authenticated:true
//   }, console.log(this.state.authenticated))
// }
// }
 

  render() {
    return (
      <div className="App">
        <Router>
         
          <Switch>
            <Route exact path="/login" component={() => <LoginPage authenticate={this.authenticate} />} />

            <Route exact path="/register" component={RegisterPage} />
  

            <PrivateRoute  path='/dashboard' component={LoadingPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
