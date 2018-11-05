import React, { Component } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class Messages extends Component {
  render() {
    return (
      <div className="post-form mb-3">
        <div className="card-body ">
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Message"
                name="text"
                value={this.props.text}
                onChange={this.props.onChange}
                error={this.props.errors.text}
                className="form-control form-control-lg"
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Messages;
