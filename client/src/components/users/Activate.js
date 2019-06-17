import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { isEmptyObject } from '../../utils';

class Activate extends Component {

  componentDidMount() {
    const { params } = this.props.match;
    const { history } = this.props;
    const { token } = params;
    this.token = token;
    return this.props.activateUser({ token, history });
  }

  render() {
    const { user, isFetching } = this.props.state.auth;

    if (isFetching) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    if (isEmptyObject(user)) {
      return (
        <main className="uk-container uk-container-small">
          <p>不正なアクセスです</p>
        </main>
      );
    }

    const { formatMessage } = this.props.intl;
    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >{formatMessage({id: "titles.activate"})}</h2>
        <p>{formatMessage({id: "messages.activate_completed"})}</p>

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>

      </main>
    );
  }
};

export default injectIntl(Activate);
