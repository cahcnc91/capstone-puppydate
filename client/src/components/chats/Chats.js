import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChats, addMessage } from "../../actions/chatActions";
import { getActiveChat } from "../../actions/chatActions";
import Spinner from "../common/Spinner";
import ChatList from "./ChatList";
import ChatIndividual from "./ChatIndividual";
import Messages from "./Messages";

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
  }

  componentDidMount() {
    this.props.getChats(this.props.match.params.id);
  }

  setActiveChat(chat) {
    this.props.getActiveChat(chat._id);
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { activeChat } = this.props.chat;

    const newMessage = {
      chatId: activeChat._id,
      name: user.name,
      text: this.state.text
    };

    const chatId = activeChat._id;
    console.log(chatId);

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
    const { errors } = this.props;
    let chatListContent;
    let messagesForm;
    let chatContent;

    if (chats === null) {
      chatListContent = (
        <h5> You have no chats yet, match with someone first!</h5>
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
        />
      );
    }

    if (chats === null) {
      chatContent = "";
    } else if (!activeChat) {
      chatContent = <h4 className="mt-4">Choose a chat</h4>;
    } else if (activeChat.messages.length === 0) {
      chatContent = <h4 className="mt-4">No messages yet. Send Hi!</h4>;
    } else {
      chatContent = <ChatIndividual activeChat={activeChat} />;
    }

    if (activeChat) {
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
      <div className="row chat">
        <div className="col-3 sidenav">{chatListContent}</div>
        <div className="col-9 main-chat mb-4">
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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getChats, getActiveChat, addMessage }
)(Chats);
