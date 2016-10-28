import React from 'react';

export default class MainInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.conversationCb({
      companion: this.props.user._id
    });
  }
  render() {
    return (
      <div className="search-result-user" style={{backgroundColor:'aquamarine'}}>
        {this.props.user.firstName}
        <button onClick={this.handleClick}>
          Create conversation
        </button>
      </div>
    );
  }
}
