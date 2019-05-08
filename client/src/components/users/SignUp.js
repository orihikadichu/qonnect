import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';

class SignUp extends React.Component {

  onClickSubmit(formData) {
    const { name, mail, password } = formData;
    const { history } = this.props;
    this.props.clickSubmit({ name, mail, password, history });
  }

  render() {
    /* const mnemonicView = this.getMnemonicView();*/
    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >新規登録</h2>
        
        <SignUpForm onSubmit={this.onClickSubmit.bind(this)} />

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>
      </main>
    );
  }
};

export default SignUp;
