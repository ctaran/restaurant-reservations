import './App.css';
import Login from '../Pages/login/login';
import Register from '../Pages/register/register';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="container">          
      <nav className="navbar fixed-top navbar-expand navbar-dark" style={{ background: "#787873" }}>
        <span className="navbar-brand mb-0 h0"><b>Restaurant Reservations</b></span>              
      </nav>
      <div className="jumbotron bg-white mt-4">
        <div className="container">
          <div className="row">
              <Switch>
                <Route path="/login" component={Login} /> 
                <Route path="/register" component={Register} />                    
                {/* <Route render={() => <h1>Page not found</h1>} /> */}
              </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
