import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MessageForm from "./messages/MessageForm";

class ChatIndividual extends Component {
  render() {
    const { chats } = this.props.chat;

    return (
      <div className="message-list">
        <div className="form-or-choose-room">
          {this.props.activeChat ? (
            <div className="messages">
              <p>{this.props.activeChat._id}</p>
              <ul>
                {this.props.activeChat.messages.map(message => {
                  if (message) {
                    return (
                      <table key={message.id}>
                        <tr>
                          <td id="username-line" style={{ fontWeight: "bold" }}>
                            {" "}
                            {message.user}{" "}
                          </td>
                          <td id="time-line">{message.date} </td>
                        </tr>
                        <tr>
                          <td id="content-td">says: {message.text} </td>
                          <td />
                        </tr>
                      </table>
                    );
                  }
                })}
              </ul>

              <MessageForm />
            </div>
          ) : (
            <h2>Choose a Chat</h2>
          )}
        </div>
      </div>
    );
  }
}

ChatIndividual.propTypes = {
  chat: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(mapStateToProps)(ChatIndividual);
