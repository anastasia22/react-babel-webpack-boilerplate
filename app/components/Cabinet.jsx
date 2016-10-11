import React from 'react';
import Header from './Header';
import MainArea from './MainArea';
import MainInput from './MainInput';
import SideMenu from './MainInput';

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
          <Header />
          <SideMenu />
          <div> Cabinet </div>
          <MainArea />
          <MainInput />
      </div>
    );
  }
}
