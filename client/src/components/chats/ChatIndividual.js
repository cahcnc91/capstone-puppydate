import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MessageForm from "./messages/MessageForm";

class ChatIndividual extends Component {
  render() {
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
                            {message.user}{" "}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ChatIndividual);
