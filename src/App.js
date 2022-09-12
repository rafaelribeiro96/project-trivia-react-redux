import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Home from './pages/Home';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/home" component={ Home } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
