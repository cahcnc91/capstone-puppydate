import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { addMessage } from "../../../actions/chatActions";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { chatId } = this.props;

    const newMessage = {
      user: user.id,
      name: user.name,
      text: this.state.text
    };

    this.props.addMessage(chatId, newMessage);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Message"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
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

MessageForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addMessage }
)(MessageForm);
