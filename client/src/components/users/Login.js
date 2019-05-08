import React from 'react';
import { Link } from 'react-router-dom';
/* import { ClipLoader } from 'react-spinners';*/
import LoginForm from './LoginForm';

class Login extends React.Component {


  onClickSubmit(formData) {
    const { mail, password } = formData;
    const { history } = this.props;
    return this.props.handleSubmit({ mail, password, history });
  }

  render() {
    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >Login</h2>
        
        <LoginForm onSubmit={this.onClickSubmit.bind(this)} />

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>

      </main>
    );
  }
};

export default Login;
