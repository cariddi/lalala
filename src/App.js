import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import './App.css';
import ContainerListContacts from './containers/contacts/ContainerListContacts';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={ContainerListContacts} />
      </Switch>
    </div>
  );
}

export default App;
