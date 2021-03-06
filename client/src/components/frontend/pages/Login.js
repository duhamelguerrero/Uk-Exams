import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import { resetMsg } from "../../../actions/notificationActions";

import TextFieldGroup from "../../common/TextFieldGroup";

import { Alert } from "reactstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      alertVisible: false,
      alertMsg: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (Object.keys(this.props.notification).length > 0) {
      this.setState({ alertVisible: true, alertMsg: this.props.notification });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onDismiss = () => {
    this.setState({ alertVisible: false });
    this.props.resetMsg();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container my-4">
        <Alert
          color={this.state.alertMsg.state}
          isOpen={this.state.alertVisible}
          toggle={this.onDismiss}
        >
          {this.state.alertMsg.msg}
        </Alert>
        <div className="card" style={{ margin: "auto", maxWidth: "25rem" }}>
          <div
            className="card-img-top my-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              className="rounded-circle"
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="Perfil Icon"
            />
          </div>
          <p id="profile-name" className="profile-name-card" />
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                type="email"
                name="email"
                placeholder="Email address"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />

              <TextFieldGroup
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />

              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">Remember me</label>
              </div>

              <button className="btn btn-lg btn-secondary" type="submit">
                LOG IN
              </button>
            </form>
            <Link to="/resetpassword" className="forgot-password">
              Forgot the password?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  resetMsg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notification: state.notification,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, resetMsg }
)(Login);
