import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./Messages.css";

class ChatIndividual extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    const { activeChat } = this.props;
    if (activeChat !== null) {
      this.scrollToBottom();
    }
  }

  componentDidUpdate() {
    const { activeChat } = this.props;
    if (activeChat !== null) {
      this.scrollToBottom();
    }
  }

  render() {
    const { activeChat, user } = this.props;

    return (
      <div className="MessageContainer">
        {activeChat.messages.map((message, i) => (
          <Fragment>
            {message.user_id === user.id ? (
              <div className="SelfMessage">
                <div className="Message SelfMessage">{message.text}</div>
              </div>
            ) : (
              <div className="SenderMessage">
                <div className="Message SenderMessage">{message.text}</div>
              </div>
            )}
          </Fragment>
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}
ChatIndividual.propTypes = {
  activeChat: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
export default ChatIndividual;
