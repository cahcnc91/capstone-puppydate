import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    this.props.getChats();

    this.socket.on("message", data => {
      const { activeChat } = this.props.chat;
      const { user } = this.props.auth;
      if (activeChat._id === data.chatId && data.name !== user.puppyname) {
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
    const { errors, users } = this.props;
    let chatListContent;
    let messagesForm;
    let chatContent;
    let headerContent;

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
          users={users}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
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
      chatContent = <ChatIndividual activeChat={activeChat} user={user} />;
    }

    if (!activeChat._id) {
      headerContent = <div />;
    } else {
      let userRecip;
      if (activeChat.users[0] === user.id) {
        userRecip = users[activeChat.users[1]];
      } else {
        userRecip = users[activeChat.users[0]];
      }

      headerContent = (
        <Fragment>
          <div className="row-flex">
            <img
              className="rounded-circle avatar-messenger"
              src={userRecip.user.avatar}
              title="You must have a Gravatar connected to your email to display image"
            />
            <div>
              <p className="lead">{userRecip.user.puppyname}</p>
              <p className="last-sent-message">
                Owner: {userRecip.user.owner_name}
              </p>
            </div>
          </div>
          <Link to={`/profile/${userRecip.handle}`} className="btn btn-info">
            View Profile
          </Link>
        </Fragment>
      );
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
          <div className="header-messenger">{headerContent}</div>
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
  users: state.profile.profiles
});

export default connect(
  mapStateToProps,
  { getChats, getActiveChat, addMessage, pushMessageSockets }
)(Chats);
