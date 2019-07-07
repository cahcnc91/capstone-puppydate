import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class ChatList extends Component {

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
                 
                 {chat.nameUser === user.name? (
                   <div
                    key={chat._id}
                    onClick={() => this.props.setActiveChat(chat)}
                    className={activeChat._id === chat._id? 'active-chat-selected chat-list': 'chat-list'}
                    >
                      <img
                        className="rounded-circle"
                        src={chat.user.avatar}
                        alt={user.name}
                        style={{ width: "25px", marginRight: "5px" }}
                        title="You must have a Gravatar connected tp your email to display image"
                      />{" "}
                      <p>{chat.nameUserMatch}</p>
                    
                    </div>
                 ) : (
                  <div
                    key={chat._id}
                    onClick={() => this.props.setActiveChat(chat)}
                    className={activeChat._id === chat._id? 'active-chat-selected chat-list': 'chat-list'}
                  >
                    <img
                      className="rounded-circle"
                      src={chat.user.avatar}
                      alt={user.name}
                      style={{ width: "25px", marginRight: "5px" }}
                      title="You must have a Gravatar connected tp your email to display image"
                    />{" "}
                    <p>{chat.nameUser}</p>
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
  chats: PropTypes.array.isRequired
};

export default ChatList;
