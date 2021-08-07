import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Profile from './pages/Profile'
import Layout from './Components/Layout'

ReactDOM.render(
  <Router>
    <Layout>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/profile" component={Profile} />
      </div>
    </Layout>
  </Router>,
  document.getElementById('root')
)