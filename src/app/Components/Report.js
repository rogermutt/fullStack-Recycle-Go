import React, { Component } from "react";



class Testing extends Component {

  constructor(props) {
    super(props)

    this.state = {
      itemsSelected: []
    }
  }

  clickHandling (e){
    console.log("Click ",e.target);
  }

  render () {

    return (

      <React.Fragment>
  
      <ul className="collection">
  
      <li className="collection-item avatar">
       <img className="circle" src='images/box.png' alt="" /> 
        <span className="title">Title</span>
        <p>First Line</p>
      </li>
  
      <li className="collection-item avatar">
        <i className="material-icons circle">folder</i>
        <span className="title">Title</span>
        <p>First Line</p>
        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
      </li>
  
      <li className="collection-item avatar">
        <i className="material-icons circle green">insert_chart</i>
        <span className="title">Title</span>
        <p>First Line</p>
        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
      </li>
  
      <li className="collection-item avatar">
        <i className="material-icons circle red">play_arrow</i>
        <span className="title">Title</span>
        <p>First Line</p>
        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
      </li>
  
    </ul>
  
      </React.Fragment>
  
    )
  }
};


export default class Report extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: []
      }
    }

    componentDidMount(){

      fetch('/api/itemsSelected')
      .then(res => res.json())
      .then(data => {

        let itemsSelected = [];
        data.map(el => el.items).map(array => array.map( el => itemsSelected.push(el)));
        this.setState({itemsSelected});
        
      });

    }

    render () {
        return (
          <React.Fragment>

          {/* If there are items on the DB met print them all inside React frag 
          otherwise print <p> w/ message  */}

          {this.state.itemsSelected.length > 0 ? (  

          <React.Fragment>
            
           <h3> There are {this.state.itemsSelected.length} items on the DB</h3> 

          {this.state.itemsSelected.map(el=>el._id).map((id, idx) =>
          <p key={idx}>{id}</p>
          )} 
          </React.Fragment>

            ) : (

            <p>No elements in the Db</p>

            )}

          </React.Fragment> 
            )
        }
}

