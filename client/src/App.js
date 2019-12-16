import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Landing from './Components/Layout/Landing'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'

import { Provider } from 'react-redux';
import store from './store'


function App() {
  return (
    <Provider store={store}>
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
   </Provider>
  );
}

export default App;
