import React, { Component } from "react";

class ChatIndividual extends Component {

  render() {
    return (
      <div className="message-list">
        <h4>Messages</h4>
        <div className="form-or-choose-room">
          {this.props.messages ? (
            <div className="messages">
              <ul>
                {this.props.messages.map((message, index) => {
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
              </ul>
            </div>
          ) : (
            <h2>Choose a Chat</h2>
          )}
        </div>
      </div>
    );
  }
}

export default ChatIndividual;