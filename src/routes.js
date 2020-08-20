import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Profile from './pages/Profile'

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>
)

export default routing