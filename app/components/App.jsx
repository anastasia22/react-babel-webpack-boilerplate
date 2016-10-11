import React from 'react';
import MainInput from './MainInput';
import Register from './Register'

require('./App.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      mainConversation: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.MainInputChangeCallback = this.MainInputChangeCallback.bind(this);
    this.handleNewMessages = this.handleNewMessages.bind(this);
    // this.props.socket.on('chat_message', this.handleNewMessages)
  }
  handleClick() {
    // this.props.socket.emit('chat_message', this.state.inputValue);
  }
  handleNewMessages(data) {
    this.setState({
      mainConversation: this.state.mainConversation.concat(data)
    });
  }
  MainInputChangeCallback(newValue) {
    this.setState({inputValue: newValue});
  }
  render() {
    return
    (<div>hello its slack
      {this.props.children}
    </div>)
  }
}


/*
return (
<div>
  <h1>This is Slack </h1>
  <MainInput changeCallback={this.MainInputChangeCallback}/>
  <button onClick={this.handleClick}> Send message </button>
  <div id="data">
    {this.state.mainConversation.map(function(item, i){
        return (<div className="message" key={i}> {item} </div>);
    })}
  </div>
</div>
);
*/
