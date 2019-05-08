import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class GuestOnly extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    console.log('hoge');
    this.userWillTransfer(this.props, this.context.router);
  }

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps, this.context.router);
  }

  userWillTransfer(props, router) {
    const { auth } = props.state;
    const { history } = router;
    if (auth.isLoggedIn) {
      /* return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />;*/
      return history.replace('/');
    }
  }

  render() {
    return (
      <Route children={this.props.children} />
    );
  }
}
