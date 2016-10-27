import React from 'react';
import MainInput from './MainInput';


export default class MainArea extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.initData) {
      this.state = {};
      this.state.initData = this.props.initData;
      Object.assign(this.state, {isInitDataAvailable: true});
    } else {
      this.state = {isInitDataAvailable: false};
    }
  }
  render() {
    if (this.state.isInitDataAvailable) {
    return (
      <div className="main-area">
        Main chat area
        <MainInput initData={this.state.initData}/>
      </div>
    );
  } else {
    return null;
  }
  }
}
