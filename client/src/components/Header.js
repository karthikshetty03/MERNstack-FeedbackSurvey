import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return " ";
      case false:
        return <a href="/auth/google">Login with Google</a>;
      default:
        return (
          <div>
            <li key="1">
              <Payments />
            </li>
            <li key="4"  style= {{margin : '0 5px', fontSize : '25px',color : 'black'}}>
              Welcome, {this.props.auth.googleName || this.props.auth.name}
            </li>
            <li key="3" style= {{margin : '0 5px'}}>Credits : {this.props.auth.credits}</li>
            <li key="2">
              <a className="right" href="/api/logout">
                Logout
              </a>
            </li>
          </div>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            className="brand-logo left"
            to={this.props.auth ? "/surveys" : "/"}
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
