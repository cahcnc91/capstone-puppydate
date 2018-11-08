import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatIndividual extends Component {

  render() {
    const { activeChat } = this.props;

    return (
        <div>
          {activeChat.messages.length > 0 ? (
            <div>
              <h4 className="mt-3">Messages</h4>
              {activeChat.messages.map((message, index) => {
                return (
                  <table key={index}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold" }} key={index}>
                          {" "}
                          {message.name}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>At {message.date}</td>
                      </tr>
                      <tr>
                        <td>says: {message.text} </td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          ) : (
            <h5>You guys haven't talked yet. Send Hi!</h5>
          )}
        </div>
    );
  }
}

ChatIndividual.propTypes = {
  activeChat: PropTypes.object.isRequired
};

export default ChatIndividual;
