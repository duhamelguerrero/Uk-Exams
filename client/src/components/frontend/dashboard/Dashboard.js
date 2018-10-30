import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged user has profile data
      if (Object.keys(profile).length > 0) {
        if (user.range === 2) {
          dashboardContent = <h1>No verified</h1>;
        } else if (user.range === 0) {
          dashboardContent = (
            <div>
              <h1>Admin</h1>
              <Link to="/edit-course" className="btn btn-lg btn-info">
                Add course
              </Link>
            </div>
          );
        }
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p>Welcome {user.name}</p>
            <Link to="/profile-settings" className="btn btn-lg btn-info">
              Go
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);