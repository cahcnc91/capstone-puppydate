import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChats, getChat, addMessage } from "../../actions/chatActions";
import Spinner from "../common/Spinner";
import ChatList from "./ChatList";
import ChatIndividual from "./ChatIndividual";
import Messages from "./Messages";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChat: "",
      text: "",
      errors: {},
      messages: []
    };

    this.setActiveChat = this.setActiveChat.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.state.activeChat === "") {
      this.props.getChats();
    }
       
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  setActiveChat(chat) {
    this.setState({ activeChat: chat });
    this.setState({ messages: chat.messages });
  }

  onSubmit() {
    const { user } = this.props.auth;

    const newMessage = {
      chatId: this.state.activeChat._id,
      name: user.name,
      text: this.state.text
    };

    const chatId = this.state.activeChat._id;

    this.props.addMessage(chatId, newMessage);
    this.setState({ text: "" });
    this.setState({ messages: this.state.messages.concat(newMessage) });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { chats, loading } = this.props.chat;
    const { user } = this.props.auth;
    const { errors } = this.props;
    let chatListContent;
    let chatIndividual;
    let messagesForm;

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
          user={user}
          activeChat={this.state.activeChat}
          setActiveChat={this.setActiveChat}
        />
      );
    }

    if (loading) {
      chatIndividual = <Spinner />;
    } else if (chats === null) {
      chatIndividual = <h4> You have no messages yet, let's talk!</h4>;
    } else if (this.state.activeChat === "") {
      chatIndividual = <h4> Choose a chat</h4>;
    } else {
      chatIndividual = <ChatIndividual messages={this.state.messages} />;
    }
    if (this.state.activeChat !== "") {
      messagesForm = (
        <Messages
          errors={errors}
          activeChat={this.state.activeChat}
          onSubmit={this.onSubmit}
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
        <div className="col-9 main-chat">
          <div id="message-history">{chatIndividual}</div>
          <div id="new-message">{messagesForm}</div>
        </div>
      </div>
    );
  }
}
Chats.propTypes = {
  getChats: PropTypes.func.isRequired,
  getChat: PropTypes.func.isRequired,
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
  { getChats, getChat, addMessage }
)(Chats);
