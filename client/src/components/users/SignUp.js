import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { injectIntl } from 'react-intl';

class SignUp extends React.Component {

  onClickSubmit(formData) {
    const { name, mail, password } = formData;
    const { history } = this.props;
    this.props.clickSubmit({ name, mail, password, history });
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >{ formatMessage({id: "titles.sign_up"}) }</h2>
        
        <SignUpForm onSubmit={this.onClickSubmit.bind(this)} />

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>
      </main>
    );
  }
};

export default injectIntl(SignUp);
