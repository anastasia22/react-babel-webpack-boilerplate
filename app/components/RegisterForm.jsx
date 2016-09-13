import React from 'react';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      email: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleFirstNameChange(event) {
      this.setState({firstName: event.target.value});
  }
  handleLastNameChange(event) {
      this.setState({lastName: event.target.value});
  }
  handlePasswordChange(event) {
      this.setState({password: event.target.value});
  }
  handleEmailChange(event) {
      this.setState({email: event.target.value});
  }
  onSubmit(e, data) {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/register');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify(this.state));
  }
  render() {
    return (
      <form name="RegisterForm" onSubmit={this.onSubmit}>
        <input
          name="firstName"
          type="text"
          placeholder="Enter first name..."
          onChange={this.handleFirstNameChange}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Enter last name..."
          onChange={this.handleLastNameChange}
        />
        <input
          name="email"
          type="text"
          placeholder="Enter email..."
          onChange={this.handleEmailChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter password..."
          onChange={this.handlePasswordChange}
        />
        <input type="submit" name="submit"/>
    </form>
    );
  }
}
