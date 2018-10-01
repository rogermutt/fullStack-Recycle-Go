import React, { Component } from "react";
import H5 from "./H5"

export default class Registration extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();

    console.log("Before ", this.state);
    
      fetch('/api/regoRouting', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Account Saved'});
          this.setState({
            email: "",
            password: "" 
          }); 
        })
        .catch(err => console.error(err));
  }

    render () {
        return (

          

                <div className="col s12 m4 l3">

                    <div className="row">
                      <H5 title="Sign up" />
                    </div>

                  <div className="row">

                          <form onSubmit={this.addTask}>

                            <div className="row">
                              <div className="input-field col s12">
                                <input name="username" value={this.state.username} onChange={this.handleChange} type="text" autoFocus/>
                              </div>
                            </div>

                            <div className="row">
                              <div className="input-field col s12">
                                <input name="password" value={this.state.password} onChange={this.handleChange} type="text" autoFocus/>
                              </div>
                            </div>

                            <div className="row">
                              <button type="submit" className="btn light-blue darken-4">
                                Register 
                              </button>
                            </div>

                          </form>
                        </div>                    
                  </div>
          
            )
        }
}