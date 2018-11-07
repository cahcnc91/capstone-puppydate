import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChats, addMessage } from "../../actions/chatActions";
import { getActiveChat } from '../../actions/activeChatAction';
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
      errors: {}
    };

    this.setActiveChat = this.setActiveChat.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getChats(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  setActiveChat(chat) {
    this.props.getActiveChat(chat._id);
    this.setState({ activeChat: chat });
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
    const { activeChat } = this.props.activeChat;
    const { user } = this.props.auth;
    const { errors } = this.props;
    let chatListContent;
    let messagesForm;
    let chatContent;

    if (chats === null) {
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

    if(this.state.activeChat === "") {
      chatContent = <p>Choose a chat</p>
    } else {
      chatContent = <ChatIndividual activeChat={activeChat}/>
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
          <div id="message-history">
            {chatContent}
          </div>
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
  activeChat: state.activeChat
});

export default connect(
  mapStateToProps,
  { getChats, getActiveChat, addMessage }
)(Chats);
