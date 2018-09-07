import React, { Component } from "react";
import { HashRouter, Link } from 'react-router-dom';

export default class Footer extends Component {
  render () {
      return (
            <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
              <HashRouter>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/landing">Landing</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/select">Select</Link></li>
                <li><Link to="/calendar">Calendar</Link></li>
              </ul>
              </HashRouter>
            </div>
          </nav>            
          )
      }
};