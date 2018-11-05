import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatList extends Component {
  
  render() {
    const { chats, user } = this.props;

    let userChats = chats.filter(chat => {
      return chat.user === user.id || chat.userMatch === user.id;
    });

    return (
      <div>
        <h3>Chats</h3>
        <table>
          <colgroup>
            <col />
          </colgroup>
          <tbody>
            {userChats.map(chat => (
              <tr
                key={chat._id}
                onClick={() => this.props.setActiveChat(chat)}
                style={{
                  backgroundColor:
                    this.props.activeChat === chat ? "pink" : "none"
                }}
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