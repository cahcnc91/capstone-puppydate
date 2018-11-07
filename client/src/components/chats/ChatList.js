import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatList extends Component {

  render() {
    const { chats, user } = this.props;

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
                onClick={() => this.props.setActiveChat(chat)}
                style={{
                  background: this.props.activeChatSelected === chat ? "blue" : "none"
                  
                }}
                className="chat-list"
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
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired
};

export default ChatList;