import React from 'react';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';

class LoginForm extends React.Component {
  render() {
    return (
      <Formik
      initialValues={{
        mail: '',
        password: ''
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        this.props.onSubmit(values);
        setSubmitting(false);
        return;
      }}
      render={({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
        <form onSubmit={handleSubmit} >
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <Field
                id={'mail'}
                name="mail"
                component="input"
                type="text"
                placeholder="メールアドレス"
                className={'form-control uk-input'}
              />
            </div>
            <div className="uk-margin">
              <Field
                id={'password'}
                name="password"
                component="input"
                type="password"
                placeholder="パスワード"
                className={'form-control uk-input'}
              />
            </div>
            <div className="uk-margin">
              <button className="uk-button uk-button-primary" >ログイン</button>
            </div>
          </fieldset>
        </form>
      )}
      />
    );
  }
}


const mapStateToProps = state => {
  return {
    state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
