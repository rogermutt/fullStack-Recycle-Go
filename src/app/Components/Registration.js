import React, { Component } from "react";
import H5 from "./H5"
import { Redirect } from 'react-router-dom'

export default class Registration extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      hasRegistered: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmission = this.onSubmission.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onSubmission(e) {
    e.preventDefault();

    this.setState({
      hasRegistered: true
    }, () => {
      console.log("After ", this.state);
    });

    // fetch('/api/regoRouting', {
    //   method: 'POST',
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     window.M.toast({html: 'Account Saved'});
    //     this.setState({
    //       email: "",
    //       password: "" 
    //     }); 
    //   })
    //   .catch(err => console.error(err));
  }

  render() {

    if (this.state.hasRegistered === true) {
      return <Redirect to='/landing' />
    }
    
    return (
      <React.Fragment>
        <div className="col s12 m4 l3">

          <div className="row">
            <H5 title="Sign up" />
          </div>

          <div className="row">

            <form onSubmit={this.onSubmission}>

              <div className="row">
                <div className="input-field col s12">
                  <input name="username" value={this.state.username} onChange={this.handleChange} type="text" autoFocus />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input name="password" value={this.state.password} onChange={this.handleChange} type="text" autoFocus />
                </div>
              </div>

              <input type="submit" value="Submit" />

            </form>
          </div>
        </div>

      </React.Fragment>
    )
  }
}