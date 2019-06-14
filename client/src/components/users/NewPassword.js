import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
/* import { ClipLoader } from 'react-spinners';*/
import PasswordForm from './PasswordForm';
import { injectIntl } from 'react-intl';
import { isEmptyObject } from '../../utils';

class NewPassword extends Component {

  componentDidMount() {
    const { params } = this.props.match;
    const { token } = params;
    this.token = token;
    return this.props.fetchUser(token);
  }

  onClickSubmit(formData) {
    const { password } = formData;
    const { id } = this.props.state.auth.user;
    const { history } = this.props;
    const token = this.token;
    return this.props.handleSubmit({ id, password, token, history });
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
        <h2 className="uk-h3" >{formatMessage({id: "titles.password_reset"})}</h2>
        <p>{formatMessage({id: "messages.enter_new_password"})}</p>
        <PasswordForm onSubmit={this.onClickSubmit.bind(this)} />

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>

      </main>
    );
  }
};

export default injectIntl(NewPassword);
