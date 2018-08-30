import React, { Component } from "react";

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
          <div>
            <div className="container">
              <div className="row">
                <div className="col s5">
                  <div className="card">
                    <div className="card-content">
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
                        <button type="submit" className="btn light-blue darken-4">
                          Register 
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
        }
}