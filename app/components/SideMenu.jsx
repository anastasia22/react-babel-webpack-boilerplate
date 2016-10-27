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
      if (this.state.isInitDataAvailable) {
        return (
          <div className="side-menu">
            Hello {this.state.initData.user.firstName} <br/>

          Conversations:<br/>
        Find friends:<br/>
          </div>
        );
      } else {
        return null;
      }
  }
}
