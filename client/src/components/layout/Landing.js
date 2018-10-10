import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  Find the perfect puppy match!
                </h1>
                <hr />
                <a
                  href="register.html"
                  className="btn btn-lg mr-2 button-customized"
                >
                  Sign Up
                </a>
                <a href="login.html" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>

          <div className="container">
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
    );
  }
}

export default Landing;
