import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./Containers/RegisterPage";
import LoginPage from "./Containers/LoginPage";
import PrivateRoute from "./Components/PrivateRoute";
import LoadingPage from "./Components/LoadingPage";
import MainPage from "./Components/MainPage";



class App extends React.Component {



  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
          <PrivateRoute  path='/dashboard' component={LoadingPage} />
          
          <Route exact path="/login" component={() => <LoginPage  />} />

           <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/" component={MainPage} />
       
  

           
          </Switch>
        
        </Router>
      </div>
    );
  }
}

export default App;
