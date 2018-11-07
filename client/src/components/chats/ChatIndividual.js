import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatIndividual extends Component {
  render() {
    const { activeChat } = this.props;

    return (
      <div className="message-list">
        <h4>Messages</h4>
        <div>
            <div className="messages">
              <ul>
                {activeChat.messages.map((message, index) => {
                  return (
                    <table key={index}>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "bold" }} key={index}>
                            {" "}
                            {message.name}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>At {message.date}</td>
                        </tr>
                        <tr>
                          <td>says: {message.text} </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
              </ul>
            </div>
        </div>
      </div>
    );
  }
}

ChatIndividual.propTypes = {
  activeChat: PropTypes.object.isRequired
};

export default ChatIndividual;
