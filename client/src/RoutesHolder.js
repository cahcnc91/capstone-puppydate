import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import Chats from "./components/chats/Chats";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profile/Profiles";
import ProfileIndividual from "./components/profile/ProfileIndividual";
import Channels from "./components/channels/Channels";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import { getProfiles, getCurrentProfile } from "./actions/profileActions";
import io from "socket.io-client";

class RoutesHolder extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.socket = io.connect();
  }
  componentDidMount() {
    this.props.getProfiles();
    this.props.getCurrentProfile();

    if (this.props.auth.user) {
      this.socket.emit("identify", {
        id: this.props.auth.user.id
      });
    }
  }
  render() {
    return (
      <Router>
        <div className="container-for-all-components">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Fragment>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/profiles" component={Profiles} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/profile/:handle"
                component={ProfileIndividual}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/channels" component={Channels} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/chats/user/:id" component={Chats} />
            </Switch>
          </Fragment>
        </div>
      </Router>
    );
  }
}
RoutesHolder.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles, getCurrentProfile }
)(RoutesHolder);
