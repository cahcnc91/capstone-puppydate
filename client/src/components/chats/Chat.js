import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChats } from "../../actions/chatActions";

class Chat extends Component {
  componentDidMount() {
    this.props.getChats();
  }

  render() {
    const { chats } = this.props.chat;
    let chatContent;

    if (chats === null) {
      chatContent = <h3>No chats</h3>;
    } else {
      chatContent = <p>uhull</p>;
    }

    return (
      <div className="container">
          <div className="row">
            <div className="col-3 sidenav">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Chats</th>
                  </tr>
                </thead>
                {chatContent}
              </table>
            </div>
            <div className="col-9">
              <h4>messages</h4>
            </div>
          </div>
      </div>
    );
  }
}

Chat.propTypes = {
  getChats: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { getChats }
)(Chat);
