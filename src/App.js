import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ Home } />
    </Switch>
  );
}
