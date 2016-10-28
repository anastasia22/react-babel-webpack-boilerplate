import React from 'react';
import $ from 'jquery'

export default class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        initData: this.props.route.initData
      }
  }
  render() {
    if (this.state.initData !== undefined) {
      const childrenWithProps = React.Children.map(this.props.children,
       (child) => React.cloneElement(child, {
         initData: this.state.initData
       }))
       return (
         <div className="app">
           {childrenWithProps}
         </div>)
    } else {
      return (
      <div className="app">
        {this.props.children}
      </div>)
    }
  }
}
