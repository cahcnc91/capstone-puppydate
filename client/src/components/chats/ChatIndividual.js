import React, { Component } from "react";

class ChatIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ""
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeChat !== this.props.activeChat) {
      this.setState({ messages: this.props.activeChat.messages });
    }
  }

  render() {

    return (
      <div className="message-list">
        <div className="form-or-choose-room">
          {this.props.activeChat ? (
            <div className="messages">
              <ul>
                {this.props.activeChat.messages.map((message, index) => {
                  return (
                    <table key={index}>
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "bold" }} key={index}>
                            {" "}
                            {message.name}{" "}
                          </td>
                          <td>{message.date} </td>
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
