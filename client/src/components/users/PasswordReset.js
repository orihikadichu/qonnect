import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* import { ClipLoader } from 'react-spinners';*/
import PasswordResetForm from './PasswordResetForm';
import { injectIntl } from 'react-intl';

class PasswordReset extends Component {

  onClickSubmit(formData) {
    const { mail } = formData;
    return this.props.handleSubmit({ mail });
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >{formatMessage({id: "titles.password_reset"})}</h2>
        <p>{formatMessage({id: "messages.enter_mail"})}</p>
        <PasswordResetForm onSubmit={this.onClickSubmit.bind(this)} />

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>

      </main>
    );
  }
};

export default injectIntl(PasswordReset);
