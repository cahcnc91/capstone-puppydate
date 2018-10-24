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
            <div className="new-messages-div">
              <p>{this.props.activeChat._id}</p>
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
