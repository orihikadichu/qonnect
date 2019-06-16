import React from 'react';
import { Link } from 'react-router-dom';
/* import { ClipLoader } from 'react-spinners';*/
import LoginForm from './LoginForm';
import { injectIntl } from 'react-intl';

class Login extends React.Component {

  onClickSubmit(formData) {
    const { mail, password } = formData;
    const { history } = this.props;
    return this.props.handleSubmit({ mail, password, history });
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >{formatMessage({id: "titles.login"})}</h2>

        <LoginForm onSubmit={this.onClickSubmit.bind(this)} />
        <p><Link to="/users/password_reset" >{formatMessage({id: "links.password_reset"})}</Link></p>

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>

      </main>
    );
  }
};

export default injectIntl(Login);
