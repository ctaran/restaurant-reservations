import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Login from '../Pages/login/login.component';
import Register from '../Pages/register/register.component';
import Home from '../Pages/home/home.component';

import { authenticationService } from '../_services';
import { PrivateRoute } from '../_elements';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null     
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(user => this.setState({
      currentUser: user
    }));
  }

  render() {
    return (
      <div className="container">          
        {/* <nav className="navbar fixed-top navbar-expand navbar-dark" style={{ background: "#787873" }}>
          <span className="navbar-brand mb-0 h0"><b>Restaurant Reservations</b></span>              
        </nav> */}
        <div className="jumbotron bg-white mt-4">
          <div className="container">
            <div className="row">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route path="/login" component={Login} /> 
                  <Route path="/register" component={Register} />                    
                  <Route render={() => <h1>Page not found</h1>} />
                </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }  
}

export default App;
