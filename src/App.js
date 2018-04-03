import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

// Stateless Component
let user = () => {
  return (
    <h1>I am from User</h1>
  );
}

let guest = ({params}) => {
  return(
    <h1>Welcome Guest {params.username}</h1>
  );
}
class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }

  handleLogin = () => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn
    }));
  }
  
  render() {
    return (
      <Router> 
        <div className="App">
          <ul>
            <li><NavLink to="/" activeStyle={{color:'green'}} exact>Home</NavLink></li>
            <li><NavLink to="/about" activeStyle={{color:'green'}} exact>About</NavLink></li>
            <li><NavLink to="/user" activeStyle={{color:'green'}} exact>User</NavLink></li>
            <li><NavLink to="/guest/venkatesh" activeStyle={{color:'green'}} exact>Guest</NavLink></li>
          </ul>
          <Prompt 
            when = {!this.state.isLoggedIn}
            message={(location) => {
              return location.pathname.startsWith("/guest") ? 'Are you sure' : true;  
            }}
          />

          <button value={this.state.val} onClick={this.handleLogin.bind(this)}>{this.state.isLoggedIn ? 'Logout' : 'login'}</button>
          <Route path="/" exact strict render={ () => { return <h4>Home</h4> } } />
          <Route path="/about" exact strict render= {() => { return <h4>About</h4>}} />
          <Route path="/user" exact strict component= {user} />
          <Route path="/guest/:username" exact strict render= {({match}) => (this.state.isLoggedIn ? (<guest username={match.params.username}/>) : (<Redirect to="/" />))} />
        </div>
      </Router>
    );
  }
}

export default App;
