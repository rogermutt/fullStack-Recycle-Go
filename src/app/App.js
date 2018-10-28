import React, { Component } from "react";
import Footer from "./Components/Footer"
import Nav from "./Components/Nav"
import ReactRouter from "./Components/_ReactRouter"

class App extends Component {
    render () {
        return (    
            <React.Fragment>
                <Nav/>
                <ReactRouter/>
                <Footer/>  
            </React.Fragment>    
            )
        }
}

export default App