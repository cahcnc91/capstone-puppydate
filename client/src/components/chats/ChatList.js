import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class ChatList extends Component {

  handleFildAvatar = (recipient) => {
    const user = this.props.profiles.filter(profile => profile.user._id === recipient)

    return user.gravatar;
  }

  render() {
    const { chats, activeChat, user } = this.props;

    return (
      <div>
        <h3>Chats</h3>
        <table>
          <colgroup>
            <col />
          </colgroup>
            {chats.map(chat => (
               <Fragment>
                 
                 {chat.userMatch1 ? (
                   <div
                    key={chat._id}
                    onClick={() => this.props.setActiveChat(chat)}
                    className={activeChat._id === chat._id? 'active-chat-selected': 'chat-list-item'}
                    >
                      <img
                        className="rounded-circle"
                        src={chat.userMatch1.avatar}
                        style={{ width: "25px", marginRight: "5px" }}
                        title="You must have a Gravatar connected tp your email to display image"
                      />{" "}
                      <p>{chat.userMatch1.puppyname}</p>
                    
                    </div>
                 ) : (
                  <div
                    key={chat._id}
                    onClick={() => this.props.setActiveChat(chat)}
                    className={activeChat._id === chat._id? 'active-chat-selected': 'chat-list-item'}
                  >
                    <img
                      className="rounded-circle"
                      src={chat.userMatch2.avatar}
                      style={{ width: "25px", marginRight: "5px" }}
                      title="You must have a Gravatar connected tp your email to display image"
                    />{" "}
                    <p>{chat.userMatch2.puppyname}</p>
                  </div>
                 )}
               </Fragment>
             ))}
        </table>
      </div>
    );
  }
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired
};

export default ChatList;
