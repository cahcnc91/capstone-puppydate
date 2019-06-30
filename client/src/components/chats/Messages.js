import React, { Component } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class Messages extends Component {

  render() {
    return (
        <form onSubmit={this.props.onSubmit} className="message-form">
          <div className="form-wrapper">
            <TextAreaFieldGroup
              placeholder="Message"
              name="text"
              value={this.props.text}
              onChange={this.props.onChange}
              error={this.props.errors.text}
            />
          </div>
          <div styles={{height: '3rem'}}>
            <button type="submit" className="btn btn-dark btn-send">
              Send
            </button>
          </div>
        </form>
    );
  }
}

export default Messages;