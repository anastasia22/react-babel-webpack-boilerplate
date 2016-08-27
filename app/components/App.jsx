import React from 'react';
import Input from './Input';

require('./App.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      mainConversation: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.InputChangeCallback = this.InputChangeCallback.bind(this);
    this.handleNewMessages = this.handleNewMessages.bind(this);
    this.props.socket.on('chat_message', this.handleNewMessages)
  }
  handleClick() {
    this.props.socket.emit('chat_message', this.state.inputValue);
  }
  handleNewMessages(data) {
    this.setState({
      mainConversation: this.state.mainConversation.concat(data)
    });
  }
  InputChangeCallback(newValue) {
    this.setState({inputValue: newValue});
  }
  render() {
    return (
    <div>
      <h1>This is Slack </h1>
      <Input changeCallback={this.InputChangeCallback}/>
      <button onClick={this.handleClick}> Send message </button>
      <div id="data">
        {this.state.mainConversation.map(function(item, i){
            return (<div className="message" key={i}> {item} </div>);
        })}
      </div>
    </div>
    );
  }
}
