import React, { Component } from "react";
import PropTypes from "prop-types";

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
    const { activeChat } = this.props;

    return (
      <div>
        <div>
          <h4 className="mt-3">Messages</h4>
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
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
      </div>
    );
  }
}
ChatIndividual.propTypes = {
  activeChat: PropTypes.object.isRequired
};
export default ChatIndividual;
