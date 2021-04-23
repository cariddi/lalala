import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import ContainerListContacts from './containers/contacts/ContainerListContacts';
import ContainerViewContact from './containers/contacts/ContainerViewContact';
import ContainerEditContact from './containers/contacts/ContainerEditContact';
import './styles/_components.scss';

function App() {
  return (
    <div className="ui container">
      <Switch>
        <Route exact path='/view/:id' exact component={ContainerViewContact} />
        <Route exact path='/edit/:id' exact component={ContainerEditContact} />
        <Route exact path='/' exact component={ContainerListContacts} />
      </Switch>
    </div>
  );
}

export default App;
