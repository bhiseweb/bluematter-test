import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Clients from './components/Client';
import Experts from './components/Expert';


class Routes extends Component {
  render() {
    return (
      <menu>
        <Switch>
          <Route path='/dashboard'  component={Dashboard} />
          <Route path='/client'  component={Clients} />
          <Route path='/expert'  component={Experts} />
        </Switch>
      </menu>
    )
  }
}

export default Routes;