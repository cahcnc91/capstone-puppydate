import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import TextFieldGroup from "../common/TextFieldGroup";
import io from "socket.io-client";

import { createChannel } from "../../actions/forum";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
      channelName: ""
    };

    this.socket = io.connect();
    this.handleAddToForum = this.handleAddToForum.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.socket.on("forum", data => {
      console.log(data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleAddToForum() {
    this.props.createChannel({ channelName: this.state.channelName });
    this.setState({ channelName: "" });
  }

  onChange(e) {
    this.setState({ channelName: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row text-center">
          <h1 className="display-4">Live Channels</h1>
        </div>
        <div className="row">
          <div className="col-md-8 m-auto">
            <TextFieldGroup
              placeholder="New Forum"
              name="channelName"
              value={this.state.channelName}
              onChange={this.onChange}
              error={errors.email}
            />
          </div>

          <button
            className="btn btn-info"
            onClick={this.handleAddToForum}
            style={{ marginBottom: "1rem" }}
          >
            Create Channel
          </button>
        </div>
      </div>
    );
  }
}
Channels.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user_id: state.profile.profile._id,
  profiles: state.profile.profiles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createChannel }
)(Channels);
