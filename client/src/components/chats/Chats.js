import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getChats,
  addMessage,
  pushMessageSockets
} from "../../actions/chatActions";
import { getActiveChat } from "../../actions/chatActions";
import Spinner from "../common/Spinner";
import ChatList from "./ChatList";
import ChatIndividual from "./ChatIndividual";
import Messages from "./Messages";
import io from "socket.io-client";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.setActiveChat = this.setActiveChat.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.socket = io.connect();
  }

  componentDidMount() {
    this.props.getChats(this.props.match.params.id);

    this.socket.on("message", data => {
      const { activeChat } = this.props.chat;
      console.log(activeChat);
      if (activeChat._id === data.chatId) {
        console.log(`message ${data.message} ${data.chatId}`);
        this.props.pushMessageSockets([data]);
      }
    });
  }

  setActiveChat(chat) {
    this.props.getActiveChat(chat._id);
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { activeChat } = this.props.chat;

    let receiver;

    if (user === activeChat.user) {
      receiver = activeChat.userMatch;
    } else {
      receiver = activeChat.user;
    }

    const newMessage = {
      chatId: activeChat._id,
      name: user.puppyname,
      text: this.state.text,
      receiver: receiver
    };

    const chatId = activeChat._id;

    this.props.addMessage(chatId, newMessage);
    this.setState({ text: "" });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { chats, activeChat, loading } = this.props.chat;
    const { user } = this.props.auth;
    const { errors, profiles } = this.props;
    let chatListContent;
    let messagesForm;
    let chatContent;

    if (chats === null) {
      chatListContent = (
        <h5 className="d-none d-lg-block">
          {" "}
          You have no chats yet, match with someone first!
        </h5>
      );
    } else if (loading) {
      chatListContent = <Spinner />;
    } else {
      chatListContent = (
        <ChatList
          chats={chats}
          user={user}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
          profiles={profiles}
        />
      );
    }

    if (chats === null) {
      chatContent = "";
    } else if (!activeChat._id) {
      chatContent = <h4 className="mt-4">Choose a chat</h4>;
    } else if (activeChat.messages.length === 0) {
      chatContent = <h4 className="mt-4">No messages yet. Send Hi!</h4>;
    } else {
      chatContent = <ChatIndividual activeChat={activeChat} />;
    }

    if (activeChat._id) {
      messagesForm = (
        <Messages
          errors={errors}
          onSubmit={e => this.onSubmit(e)}
          onChange={e => this.onChange(e)}
          text={this.state.text}
        />
      );
    } else {
      messagesForm = "";
    }
    return (
      <div className="chat-container">
        <div className="sidenav">{chatListContent}</div>
        <div className="chat">
          <div className="header-messenger" />
          <div id="message-history">{chatContent}</div>
          <div id="new-message">{messagesForm}</div>
        </div>
      </div>
    );
  }
}
Chats.propTypes = {
  getChats: PropTypes.func.isRequired,
  getActiveChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth,
  errors: state.errors,
  user_id: state.profile.profile._id,
  profiles: state.profile.profiles
});

export default connect(
  mapStateToProps,
  { getChats, getActiveChat, addMessage, pushMessageSockets }
)(Chats);
