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
        Its login Page Don't have account? Please <a href="/register/">register</a>
      </div>
    );
  }
}
