import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import MessageForm from "./messages/MessageForm";

class ChatIndividual extends Component {
  render() {
    const { chat } = this.props.chat;

    return (
      <div>
        <p>LIst of messages goes here</p>
        <form onSubmit={this.onSubmit}>
          <p>{chat._id}</p>
          <MessageForm chatId={chat._id} />
        </form>
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
