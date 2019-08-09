import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class ChatListItemPerson extends PureComponent {
  render() {
    const { chat, activeChat, user, users } = this.props;

    let userRecip;
    console.log("test >>>>>>>>>>>>>>");
    console.log(user.id);
    if (chat.users[0] === user.id) {
      userRecip = users[chat.users[1]];
    } else {
      userRecip = users[chat.users[0]];
    }
    return (
      <div
        key={chat._id}
        onClick={() => this.props.setActiveChat(chat)}
        className={
          activeChat._id === chat._id
            ? "active-chat-selected row-flex"
            : "chat-list-item row-flex"
        }
      >
        <img
          className="rounded-circle avatar-messenger"
          src={userRecip.avatar}
          title="You must have a Gravatar connected tp your email to display image"
        />{" "}
        <div className="width-full">
          <div className="row-flex justify-between align-items">
            <p className="lead">{userRecip.puppyname}</p>
            <p className="last-sent-message">
              {chat.messages.length > 0
                ? moment(chat.messages[0].date).fromNow()
                : ""}
            </p>
          </div>
          {chat.messages.length > 0 ? (
            <div className="row-flex align-items">
              <p className="last-sent-message">
                <b>
                  {chat.messages[0].name === user.puppyname
                    ? "You"
                    : chat.messages[0].name}
                  :{" "}
                </b>
              </p>
              <p className="last-sent-message">{chat.messages[0].text}</p>
            </div>
          ) : (
            <div className="row-flex align-items">
              <p className="last-sent-message">
                Say hi to your friend {userRecip.puppyname}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ChatListItemPerson.propTypes = {};

export default ChatListItemPerson;
