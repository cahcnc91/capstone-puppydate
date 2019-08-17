import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ChatListItemPerson from "./ChatListItemPerson";

class ChatList extends Component {
  render() {
    const { chats, activeChat, setActiveChat, user, users } = this.props;
    const chatArray = Object.values(chats);
    return (
      <table>
        <colgroup>
          <col />
        </colgroup>
        {chatArray.map(chat => (
          <ChatListItemPerson
            chat={chat}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            user={user}
            users={users}
          />
        ))}
      </table>
    );
  }
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired
};

export default ChatList;
