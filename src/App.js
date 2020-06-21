import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'login', students: [
        { id: 1, name: 'A', age: 21, email: 'a@gmail.com' },
        { id: 2, name: 'B', age: 19, email: 'b@gmail.com' },
        { id: 3, name: 'C', age: 16, email: 'c@gmail.com' },
        { id: 4, name: 'D', age: 25, email: 'd@gmail.com' }
      ]
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //logout
  handleLogout() {
    this.setState({ mode: 'login' });
  }

  handleLogin(e) {
    e.preventDefault();
    let request = {
      email: document.getElementById('exampleInputEmail1').value,
      password: document.getElementById('exampleInputPassword1').value
    }
    axios.post('http://localhost:3000/login', request)  //authentication 
      .then(resp => {
       // alert(resp.data.message);
        this.setState({ mode: 'logout' });
      })
      .catch(err => {
        console.log(err);
       // alert("Please enter valid credentials!!")
        document.getElementById('errMsg').innerHTML = "Invalid Credentials!!";
        document.getElementById('exampleInputEmail1').style.borderColor = "red";
        document.getElementById('exampleInputPassword1').style.borderColor = "red";
      })
  }
  //dynamic table data
  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, name, age, email } = student
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }
  //dynamic table header
  renderTableHeader() {
    let header = Object.keys(this.state.students[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    });
  }

  //main page
  render() {
    if (this.state.mode === 'login') {
      return (
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand mb-0 h1">Practical-React</Link>
                </div>
              </div>
            </nav>
            <div className="container border center_div">
              <center>
                <div className="page-header margin_form_elements">
                  <h1>Login Page</h1>
                </div>
              </center>
              <div id="errMsg"></div>
              <form onSubmit={(e) => this.handleLogin(e)}>
                <div class="form-group">
                  <label for="exampleInputEmail1" className="margin_form_elements">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  <small id="emailMsg" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" />
                  <small id="emailMsg" class="form-text text-muted"></small>
                </div>
                <center><button type="submit" class="btn btn-primary btn-lg margin_login">Login</button></center>
              </form>
            </div>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand mb-0 h1">Practical-React</Link>
              </div>
              <div>
                <ul className="nav navbar-nav navbar-right">
                  <li><button type="button" class="btn btn-primary" onClick={this.handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          </nav>
          <div>
            <center><h2 class="margin_dash_header">WELCOME TO DASHBOARD!!</h2>
              <div>
                <h1 class="header_css">React Dynamic Table</h1>
                <table class="table table-striped">
                  <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                  </tbody>
                </table>
              </div>
            </center>
          </div>
        </Router>
      );
    }
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
