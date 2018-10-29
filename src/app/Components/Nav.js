import React, { Component } from "react";
import { Link } from 'react-router-dom';

//  Add materialize Tabs animation
export default class Footer extends Component {
  render () {
      return (
          <React.Fragment>
          <div className="navbar-fixed">
              <nav>
                <div className="nav-wrapper">
                  <a href="#" className="brand-logo">Logo</a>
                  <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                  
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/authorize">Login</Link></li>
                    <li><Link to="/">Landing</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                    <li><Link to="/select">Select</Link></li>
                    <li><Link to="/calendar">Calendar</Link></li>
                  </ul>
                  
                </div>
              </nav> 
            </div>

                  <ul className="sidenav" id="mobile-demo">
                    <li><Link className="sidenav-close" to="/x">XXXXXX</Link></li>
                    <li><Link className="sidenav-close" to="/">Landing</Link></li>
                    <li><Link className="sidenav-close" to="/reports">Reports</Link></li>
                    <li><Link className="sidenav-close" to="/select">Select</Link></li>
                    <li><Link className="sidenav-close" to="/calendar">Calendar</Link></li>
                </ul>

          </React.Fragment>
          )
      }
};