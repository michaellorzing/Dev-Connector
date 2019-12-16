import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'
import Landing from './Components/Layout/Landing'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Alert from './Components/Layout/Alert'
import { loadUser } from './actions/auth'

import { Provider } from 'react-redux';
import store from './store'
import setAuthToken from './utils/setAuthToken';

if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path='/' component={Landing}/>
          <section className='container'>
            <Alert />
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
