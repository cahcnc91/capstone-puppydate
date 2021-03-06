import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Footer from "./Footer";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <Fragment>
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="mb-4">
                    Find the perfect puppy match
                  </h1>
                  <hr />
                  <Link
                    to="/register"
                    className="btn btn-lg mr-2 button-customized"
                  >
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </div>
              </div>

              <section className="row text-center landing-section-info">
                <section className="col-lg-4">
                  <h5 className="card-text">
                    Make your own profile, tell others what your puppy likes, and
                    add pictures of it.
                  </h5>
                  <ion-icon size="large" name="people" />
                </section>

                <section className="col-lg-4">
                  <h5 className="card-text">
                    Go through profiles and find toher puppies your own would like
                    to have a playdate.
                  </h5>
                  <ion-icon size="large" name="heart" />
                </section>

                <section className="col-lg-4">
                  <h5 className="card-text">
                    Get a match, BOOM you automatically get a private chat box for
                    you two to set playdates anytime you want!
                  </h5>
                  <ion-icon size="large" name="paw" />
                </section>
              </section>
            </div>

          </div>
        </div>
        <Footer />
      </Fragment>
      
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
