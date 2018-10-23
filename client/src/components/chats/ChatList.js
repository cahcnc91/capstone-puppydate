import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ChatList extends Component {
  render() {
    const { chats } = this.props;
    return chats.map(chat => (
      <Link chat={chat} to={`/chats/${chat._id}`}>
        {chat._id}
      </Link>
    ));
  }
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired
};

export default ChatList;
