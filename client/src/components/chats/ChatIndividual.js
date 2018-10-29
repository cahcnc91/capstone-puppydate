import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Messages from "./Messages";
import { addMessage } from "../../actions/chatActions";

class ChatIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit() {
    const { user } = this.props.auth;

    const newMessage = {
      chatId: this.props.activeChat,
      name: user.name,
      text: this.state.text
    };

    const chatId = this.props.activeChat;

    this.props.addMessage(chatId, newMessage);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="message-list">
        <div className="form-or-choose-room">
          {this.props.activeChat ? (
            <div className="messages">
              <p>{this.props.activeChat._id}</p>
              <ul>
                {this.props.activeChat.messages.map((message, index) => {
                  return (
                    <table key={index}>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "bold" }} key={index}>
                            {" "}
                            {message.name}{" "}
                          </td>
                          <td>{message.date} </td>
                        </tr>
                        <tr>
                          <td>says: {message.text} </td>
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
              </ul>

              <Messages
                errors={errors}
                activeChat={this.props.activeChat}
                onSubmit={this.onSubmit}
                onChange={e => this.onChange(e)}
                text={this.state.text}
              />
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
  addMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMessage }
)(ChatIndividual);
