import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

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
      qualities: "",
      owner: "",
      instagram: "",
      youtube: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
      qualities: this.state.qualities,
      owner: this.state.owner,
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
              <h2 className="display-4 text-center">Create Your Profile</h2>
              <p className="lead text-center">
                Let's get some information to let other know about your puppy
              </p>
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
                  placeholder="Qualities"
                  name="qualities"
                  value={this.state.qualities}
                  onChange={this.onChange}
                  error={errors.qualities}
                  info="best qualitites of your pup"
                />
                <TextFieldGroup
                  placeholder="Owner"
                  name="owner"
                  value={this.state.owner}
                  onChange={this.onChange}
                  error={errors.owner}
                  info="Your name"
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
