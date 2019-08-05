import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import io from "socket.io-client";

import { addMemberForum } from "../../actions/forum";

class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.socket = io.connect();
    this.handleAddToForum = this.handleAddToForum.bind(this);
  }

  componentDidMount() {
    this.socket.on("forum", data => {
      console.log(data);
    });
  }

  handleAddToForum() {
    this.props.addMemberForum();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="display-4 text-center">Live Forum</h1>
        </div>
        <div className="row">
          <button className="btn btn-info" onClick={this.handleAddToForum}>
            Add yourself to forum
          </button>
        </div>
      </div>
    );
  }
}
Forum.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user_id: state.profile.profile._id,
  profiles: state.profile.profiles
});

export default connect(
  mapStateToProps,
  { addMemberForum }
)(Forum);
