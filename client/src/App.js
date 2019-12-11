import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Landing from './Components/Layout/Landing'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path='/' component={Landing}/>
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
