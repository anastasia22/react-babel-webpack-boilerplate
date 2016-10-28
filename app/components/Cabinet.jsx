import React from 'react';
import Header from './Header';
import MainArea from './MainArea';
import SideMenu from './SideMenu';

export default class Cabinet extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (this.props.initData) {
      this.state = {};
      this.state.initData = this.props.initData;
      Object.assign(this.state, {isInitDataAvailable: true});
    } else {
      this.state = {isInitDataAvailable: false};
    }
    this.createNewConversation = this.createNewConversation.bind(this);

  }
  createNewConversation() {

  }
  render() {
    if (this.state.isInitDataAvailable) {
      return (
        <div className="cabinet">
          <SideMenu
            initData={this.state.initData}
            conversationCb={this.createNewConversation} />
          <div className="right-menu">
            <Header initData={this.state.initData} />
            <MainArea initData={this.state.initData} />
          </div>
        </div>
      );
    }
    else {
      return null;
    }
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
        return (<div `class`Name="message" key={i}> {item} </div>);
    })}
  </div>
</div>
);


handleClick() {
  // this.props.socket.emit('chat_message', this.state.inputValue);
}
handleNewMessages(data) {
  this.setState({
    mainConversation: this.sxtate.mainConversation.concat(data)
  });
}
MainInputChangeCallback(newValue) {
  this.setState({inputValue: newValue});
}
*/
