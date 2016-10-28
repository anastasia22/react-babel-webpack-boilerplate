import React from 'react'
import $ from 'jquery'
import CompanionItem from './CompanionItem';

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.initData) {
      this.state = {
        isCompanionFound: false,
        searchBy: 'login',
        companionData: {},
        userConversations: []
      };
      this.state.initData = this.props.initData;
      Object.assign(this.state, {isInitDataAvailable: true});
    } else {
      this.state = {isInitDataAvailable: false};
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.emptySearch = this.emptySearch.bind(this);
    this.createNewConversation = this.createNewConversation.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  emptySearch() {
    $('.search-companion-field').val(null);
    this.setState({
      isCompanionFound: false,
      companionData: []
    });
  }
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/conversations?_id=' + this.state.initData.user._id,
      success: function(data) {
        this.setState({userConversations: data})
      }.bind(this),
      error:  function(data) {

      }.bind(this),
      dataType: 'json'
    });
  }
  createNewConversation(obj) {
    this.emptySearch();
    let conversationObj = Object.assign({
      owner: this.state.initData.user
    }, obj)
    $.ajax({
      type: 'POST',
      url: '/conversation',
      data: conversationObj,
      success: function(data) {
        var convs = this.state.userConversations;
        convs.push(data);
        this.setState({userConversations: convs})
      }.bind(this),
      error:  function(data) {

      }.bind(this),
      dataType: 'json'
    });
  }
  handleCheckboxChange(event) {
    console.log(event, this);
    this.setState({searchBy: event.target.value});
  }
  handleSearchChange(event) {
    if (event.target.value === '') {
      this.emptySearch();
      return;
    };
    $.ajax({
      type: 'GET',
      url: '/search?' + this.state.searchBy + '=' + event.target.value,
      success: function(data) {
        let users = data.filter(function(item, i) {
          return (item._id !== this.state.initData.user._id)
        }.bind(this));
        this.setState({
          isCompanionFound: true,
          companionData: users
        });
      }.bind(this),
      error: this.emptySearch,
      dataType: 'json'
    });
  }
  render() {
    let companions, conversations;
    if (this.state.isCompanionFound) {
      companions = this.state.companionData.map((item, i) => {
        return <CompanionItem
                  key={i}
                  conversationCb={this.createNewConversation}
                  user={this.state.companionData[i]} />
      })
    } else {
      companions = null;
    }
    if (this.state.userConversations.length > 0) {
      conversations = this.state.userConversations.map((item, i) => {
          return <div className="conversation-item">
            <span>{item.companion.firstName}</span>
          </div>
      })
    } else {
      conversations = null;
    }

      if (this.state.isInitDataAvailable) {
        return (
          <div className="side-menu">
            <div className="greeting">
                Hello {this.state.initData.user.firstName}
            </div>
            <div className="findfriends">
                Find friends: <br/><input className="search-companion-field"
                  name="searchFriends"
                  type="text"
                  placeholder="Search your friends..."
                  onChange={this.handleSearchChange}
                />
                <div className="search-results">{companions}</div>
                Search by Login <input
                  name="searchBy"
                  value="login"
                  type="radio"
                  defaultChecked={true}
                  onChange={this.handleCheckboxChange}
                /><br/>
                Search by Email <input
                  name="searchBy"
                  value="email"
                  type="radio"
                  onChange={this.handleCheckboxChange}
                />
            </div>
            <div className="conversations"> Your conversations:
              {conversations}
            </div>
          </div>
        );
      } else {
        return null;
      }
  }
}
