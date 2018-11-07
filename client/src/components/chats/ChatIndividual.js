import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatIndividual extends Component {

  render() {
    const {activeChat} = this.props;

    return (
      <div>
        <p>{activeChat._id}</p>
      </div>
    );
  }
}

ChatIndividual.propTypes = {
  activeChat: PropTypes.array.isRequired
};

export default ChatIndividual;
