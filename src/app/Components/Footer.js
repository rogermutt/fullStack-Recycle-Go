import React, { Component } from "react";
 
export default class Footer extends Component {
  render () {
      return (
          <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Footer Content</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text 
            <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </div>
          </div>
        </footer>     
          )
      }
}