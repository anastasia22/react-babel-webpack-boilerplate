import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  render() {
    return (
      <div>
        <form method="post" action="login">
            <input type="email" name="email" placeholder="Name"/><br/>
            <input type="password" name="password" placeholder="Password"/><br/>
            <input type="submit" placeholder="Log in!"/>
        </form>
        Don't have account? Please <a href="/register/">register</a>
      </div>
    );
  }
}
