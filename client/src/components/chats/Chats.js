import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChatList from "./ChatList";
import { getChats } from "../../actions/chatActions";

class Chats extends Component {
  componentDidMount() {
    this.props.getChats();
  }

  render() {
    const { chats } = this.props.chat;
    let chatContent;

    if (chats === null) {
      chatContent = <h3>No chats</h3>;
    } else {
      chatContent = <ChatList chats={chats} />;
    }

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Chats</th>
            </tr>
          </thead>
          {chatContent}
        </table>
      </div>
    );
  }
}

Chats.propTypes = {
  getChats: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { getChats }
)(Chats);
