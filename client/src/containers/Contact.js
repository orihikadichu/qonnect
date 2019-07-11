import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

class Contact extends Component {
  render() {
    const { formatMessage } = this.props.intl;

    return (
      <main className="uk-container uk-container-small">
        <p>{ formatMessage({id: "messages.contact_info"}) }</p>
        <p>qonnect.2019@gmail.com</p>
        <Link to="/">Top</Link>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Contact));
