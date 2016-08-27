import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
      this.setState({value: event.target.value});
      this.props.changeCallback(this.state.value);
  }
  render() {
    return (
      <div>
        <input
          name="message"
          type="text"
          placeholder="Enter message..."
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
