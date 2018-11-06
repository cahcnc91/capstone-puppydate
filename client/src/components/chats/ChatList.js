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
            {userChats.map(chatActive => (
              <tr
                key={chatActive._id}
                onClick={() => this.props.setActiveChat(chatActive)}
                style={{
                  backgroundColor:
                    this.props.activeChat === chatActive ? "pink" : "none"
                }}
              >
                {chatActive.user === user.id ? (
                  <td>{chatActive.nameUserMatch}</td>
                ) : (
                  <td>{chatActive.nameUser}</td>
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