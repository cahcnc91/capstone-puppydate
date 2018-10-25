import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatList extends Component {
  activeChatClicked(chat) {
    const chatActive = chat;
    this.props.setActiveChat(chatActive);
  }

  render() {
    const { chats } = this.props;

    return (
      <div>
        <h3>Chats</h3>
        <table>
          <colgroup>
            <col />
          </colgroup>
          <tbody>
            {chats.map(chat => (
              <tr
                key={chat._id}
                onClick={() => this.activeChatClicked(chat)}
                style={{
                  background: this.props.activeChat === chat ? "blue" : "none"
                }}
              >
                <td>{chat._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired
};

export default ChatList;
