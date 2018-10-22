import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addChat } from "../../actions/chatActions";

class ChatIndividual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('SUBMIT');
  }


  render() {
    return (
      <div>
        <p>LIst of messages goes here</p>
        <form onSubmit={this.onSubmit}>
          <TextAreaFieldGroup
            placeholder="Send Message"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text}
          />
        </form>
      </div>
    );
  }
}

export default ChatIndividual;
