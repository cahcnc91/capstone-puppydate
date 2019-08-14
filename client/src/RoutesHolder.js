import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
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
import { getProfiles } from "./actions/profileActions";

class RoutesHolder extends Component {
  componentDidMount() {
    this.props.getProfiles();
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { getProfiles }
)(RoutesHolder);
