import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      size: "",
      age: "",
      breed: "",
      sex: "",
      location: "",
      description: "",
      qualities1: "",
      qualities2: "",
      qualities3: "",
      puppyname: "",
      instagram: "",
      youtube: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //Bring qualities array back to comma separeted value
      //const qualitiesCVS = profile.qualities.join(",");

      // If profile field doenst exist, add or make empty string
      profile.size = !isEmpty(profile.size) ? profile.size : "";
      profile.age = !isEmpty(profile.age) ? profile.age : "";
      profile.breed = !isEmpty(profile.breed) ? profile.breed : "";
      profile.sex = !isEmpty(profile.sex) ? profile.sex : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.description = !isEmpty(profile.description)
        ? profile.description
        : "";
      profile.qualities1 = !isEmpty(profile.qualities1)
        ? profile.qualities1
        : "";
      profile.qualities2 = !isEmpty(profile.qualities2)
        ? profile.qualities2
        : "";
      profile.qualities3 = !isEmpty(profile.qualities3)
        ? profile.qualities3
        : "";
      profile.puppyname = !isEmpty(profile.puppyname) ? profile.puppyname : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : "";
      profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";

      //Set component fields state
      this.setState({
        handle: profile.handle,
        size: profile.size,
        age: profile.age,
        breed: profile.breed,
        sex: profile.sex,
        location: profile.location,
        description: profile.description,
        qualities1: profile.qualities1,
        qualities2: profile.qualities2,
        qualities3: profile.qualities3,
        puppyname: profile.puppyname,
        instagram: profile.instagram,
        youtube: profile.youtube
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      size: this.state.size,
      age: this.state.age,
      breed: this.state.breed,
      sex: this.state.sex,
      location: this.state.location,
      description: this.state.description,
      qualities1: this.state.qualities1,
      qualities2: this.state.qualities2,
      qualities3: this.state.qualities3,
      puppyname: this.state.puppyname,
      instagram: this.state.instagram,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            className=""
            placeholder="Instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="YouTube"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }

    //SELECT OPTIONS
    const options = [
      { label: "* Select Puppy Size", value: 0 },
      { label: "X-Small - Under 10 pounds", value: "x-small" },
      { label: "Small - Between 10 and 20 pounds", value: "small" },
      { label: "Medium - Between 20  and 30 pounds", value: "medium" },
      { label: "Large - Between 30 and 50 pounds", value: "x-small" },
      { label: "X-large - Over 50 pounds", value: "x-large" }
    ];

    const options2 = [
      { label: "* Sex of your pup", value: 0 },
      { label: "Female", value: "female" },
      { label: "Male", value: "male" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-4 text-center">Edit Profile</h2>

              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for you profile URL"
                />

                <SelectListGroup
                  placeholder="Puppy Size"
                  name="size"
                  value={this.state.size}
                  onChange={this.onChange}
                  options={options}
                  error={errors.size}
                  info="Size of your pup"
                />
                <TextFieldGroup
                  placeholder="Age"
                  name="age"
                  value={this.state.age}
                  onChange={this.onChange}
                  error={errors.age}
                  info="Age of your pup in years"
                />
                <TextFieldGroup
                  placeholder="Breed"
                  name="breed"
                  value={this.state.breed}
                  onChange={this.onChange}
                  error={errors.breed}
                  info="Breed or mix of breeds fo your pup"
                />
                <SelectListGroup
                  placeholder="Sex of your pup"
                  name="sex"
                  value={this.state.sex}
                  onChange={this.onChange}
                  options={options2}
                  error={errors.sex}
                  info="Sex your pup"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Where you and your pup live"
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell a little bit about your pup"
                />
                <TextFieldGroup
                  placeholder="Qualities 1"
                  name="qualities1"
                  value={this.state.qualities1}
                  onChange={this.onChange}
                  error={errors.qualities1}
                  info="Best qualitites of your pup. Example: playful, calm, outgoing."
                />
                <TextFieldGroup
                  placeholder="Qualities 2"
                  name="qualities2"
                  value={this.state.qualities2}
                  onChange={this.onChange}
                  error={errors.qualities2}
                  info="Best qualitites of your pup."
                />
                <TextFieldGroup
                  placeholder="Qualities 3"
                  name="qualities3"
                  value={this.state.qualities3}
                  onChange={this.onChange}
                  error={errors.qualities3}
                  info="Best qualitites of your pup"
                />
                <TextFieldGroup
                  placeholder="Puppy's name"
                  name="puppyname"
                  value={this.state.puppyname}
                  onChange={this.onChange}
                  error={errors.puppyname}
                  info="Name of your pup"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn button-customized btn-block mt-4"
                />
              </form>
              <p />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
