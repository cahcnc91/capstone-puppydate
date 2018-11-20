import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatList extends Component {


  render() {
    const { chats, activeChat, user } = this.props;
    let table;

    if (activeChat){
      table = (
        <tbody>
             {chats.map(chat => (
               <tr
                 key={chat._id}
                 onClick={() => this.props.setActiveChat(chat)}
                 className={activeChat._id === chat._id? 'active-chat-selected': 'chat-list'}
               >
                 {chat.user === user.id ? (
                   <td>{chat.nameUserMatch}</td>
                 ) : (
                   <td>{chat.nameUser}</td>
                 )}
               </tr>
             ))}
           </tbody>
      )
    } else {
      table = (
        <tbody>
             {chats.map(chat => (
               <tr
                 key={chat._id}
                 onClick={() => this.props.setActiveChat(chat)}
                 className='chat-list'
               >
                 {chat.user === user.id ? (
                   <td>{chat.nameUserMatch}</td>
                 ) : (
                   <td>{chat.nameUser}</td>
                 )}
               </tr>
             ))}
           </tbody>
      )
    }

    return (
      <div>
        <h3>Chats</h3>
        <table>
          <colgroup>
            <col />
          </colgroup>
          {table}
        </table>
      </div>
    );
  }
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired
};

export default ChatList;
