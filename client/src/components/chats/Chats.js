import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChats, getChat } from "../../actions/chatActions";
import Spinner from "../common/Spinner";
import ChatIndividual from "./ChatIndividual";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChat: ""
    };

    this.handleActiveChat = this.handleActiveChat.bind(this);
  }

  componentDidMount() {
    this.props.getChats();
  }

  handleActiveChat(chat) {
    this.setState({ activeChat: chat });
  }

  render() {
    const { chats, loading } = this.props.chat;
    const { user } = this.props.auth;
    let chatListContent;
    let chatIndividual;

    let userChats = chats.filter(chat => {
      return chat.user === user.id || chat.userMatch === user.id;
    });

    if (loading) {
      chatListContent = <Spinner />;
    } else if (chats === null) {
      chatListContent = (
        <h4> You have no chats yet, match with someone first!</h4>
      );
    } else {
      chatListContent = (
        <div>
          <h3>Chats</h3>
          <table>
            <colgroup>
              <col />
            </colgroup>
            <tbody>
              {userChats.map(chat => (
                <tr
                  key={chat._id}
                  onClick={() => this.handleActiveChat(chat)}
                  style={{
                    background: this.props.activeChat === chat ? "blue" : "none"
                  }}
                >
                  {chat.user === user.id ? (
                    <td>{chat.nameUserMatch}</td>
                  ) : (
                    <td>{chat.nameUser}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (loading) {
      chatIndividual = <Spinner />;
    } else if (chats === null) {
      chatIndividual = <h4> You have no messages yet, let's talk!</h4>;
    } else {
      chatIndividual = <ChatIndividual activeChat={this.state.activeChat} />;
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
  getChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  chat: state.chat,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getChats, getChat }
)(Chats);
