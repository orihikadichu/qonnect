import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class UserOnly extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.guestWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.guestWillTransfer(nextProps, this.context.router);
  }

  guestWillTransfer(props, router) {
    const { auth } = props.state;
    const { history } = router;
    if (!auth.isLoggedIn) {
      return history.push('/users/login');
    }
    return true;
  }

  render() {
    return (
      <Route children={this.props.children} />
    );
  }
}
