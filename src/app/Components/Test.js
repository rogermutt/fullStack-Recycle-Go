import React, { Component } from "react";

class Test extends Component {

  constructor() {
    super();

    this.state = {
      __id: "Roger",
      tasks: []
    };

    // this.state = {
    //   title: '',
    //   description: '',
    //   _id: '',
    //   tasks: []
    // };

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const tasks = this.state.tasks;
    this.setState({ tasks: value });
  }

  addTask(e) {
    e.preventDefault();

    console.log("Before ", this.state.tasks);
  
      fetch('/api/itemsSelected', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("Here ",data);
          window.M.toast({html: 'Task Saved'});
          this.setState({tasks: []});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
  }

  fetchTasks() {
    fetch('/api/itemsSelected')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
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
                        <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" autoFocus/>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send 
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

export default Test;