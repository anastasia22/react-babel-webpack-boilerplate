import React from 'react';

export default class SideMenu extends React.Component {
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
    return (
      <div className="header"> Header </div>
    );
  }
}
