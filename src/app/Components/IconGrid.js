import React, { Component } from "react";

export default class IconGrid extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        selected: false
      }
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      this.setState((prevState) => {
        return { selected: !prevState.selected }
      });
    }
  
    render() {
      return (
          <div onClick={this.handleClick} className={ (this.state.selected ? 'col s4 selectedItem': 'col s4') }>
            <a> <img className="responsive-img" src={this.props.path} /> </a>
          </div>
      )
    }
  }

