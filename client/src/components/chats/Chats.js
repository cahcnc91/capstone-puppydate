import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChats } from "../../actions/chatActions";
import Spinner from "../common/Spinner";
import ChatList from "./ChatList";
import ChatIndividual from "./ChatIndividual";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChat: ""
    };

    this.setActiveChat = this.setActiveChat.bind(this);
  }

  componentDidMount() {
    this.props.getChats();
  }

  setActiveChat(chatActive) {
    this.setState({ activeChat: chatActive });
  }

  render() {
    const { chats, loading } = this.props.chat;
    let chatListContent;
    let chatIndividual;

    if (loading) {
      chatListContent = <Spinner />;
    } else if (chats === null) {
      chatListContent = (
        <h4> You have no chats yet, match with someone first!</h4>
      );
    } else {
      chatListContent = (
        <ChatList
          chats={chats}
          activeChat={this.state.activeChat}
          setActiveChat={this.setActiveChat}
        />
      );
    }

    if (loading) {
      chatIndividual = <Spinner />;
    } else if (chats === null) {
      chatIndividual = <h4> You have no messages yet, let's talk!</h4>;
    } else {
      chatIndividual = (
        <ChatIndividual
          chats={chats}
          activeChat={this.state.activeChat}
          setActiveChat={this.setActiveChat}
        />
      );
    }

    return (
        <div className="row chat">
          <div className="col-3 sidejnav">{chatListContent}</div>

          <div className="col-9 main-chat">
            <h4>Messages</h4>
            {chatIndividual}
          </div>
        </div>
    );
  }
}

Chats.propTypes = {
  getChats: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { getChats }
)(Chats);
