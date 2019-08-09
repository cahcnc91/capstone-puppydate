import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ChatListItemPerson from "./ChatListItemPerson";

class ChatList extends Component {
  handleFildAvatar = recipient => {
    const user = this.props.profiles.filter(
      profile => profile.user._id === recipient
    );

    return user.gravatar;
  };

  render() {
    const { chats, activeChat, setActiveChat, user, users } = this.props;

    return (
      <table>
        <colgroup>
          <col />
        </colgroup>
        {chats.map(chat => (
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
  profiles: PropTypes.array.isRequired
};

export default ChatList;
