import React from 'react';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import { injectIntl } from 'react-intl';

class SignUpForm extends React.Component {
  validate(values) {
    let errors = {};

    if (!values.name) {
      errors.name = 'ユーザー名を入力してください';
    }

    if (!values.mail) {
      errors.mail = 'メールアドレスを入力してください';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
      errors.mail = '適切なメールアドレスを指定してください';
    }

    if (!values.password) {
      errors.password = 'パスワードを入力してください';
    }

    if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = 'パスワードが一致していません';
    }

    return errors;
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Formik
        initialValues={{
          name: '',
          mail: '',
          password: '',
          passwordConfirm: ''
        }}
        enableReinitialize={true}
        validate={this.validate}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
            this.props.onSubmit(values);
            setSubmitting(false);
            resetForm();
            return;
        }}
        render={({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit} >
            <fieldset className="uk-fieldset">
              <div className="uk-margin">
                <Field
                  id={'name'}
                     name="name"
                     component="input"
                     type="text"
                     placeholder={formatMessage({id: "placeholders.sign_ups.name"})}
                     className={'form-control uk-input'}
                />
                {touched.name && errors.name && <div className="uk-text-warning">{errors.name}</div>}
              </div>
              <div className="uk-margin">
                <Field
                  id={'mail'}
                     name="mail"
                     component="input"
                     type="text"
                     placeholder={formatMessage({id: "placeholders.sign_ups.mail"})}
                     className={'form-control uk-input'}
                />
                {touched.mail && errors.mail && <div className="uk-text-warning">{errors.mail}</div>}
              </div>
              <div className="uk-margin">
                <Field
                  id={'password'}
                     name="password"
                     component="input"
                     type="password"
                     placeholder={formatMessage({id: "placeholders.sign_ups.password"})}
                     className={'form-control uk-input'}
                />
                {touched.password && errors.password && <div className="uk-text-warning">{errors.password}</div>}
              </div>
              <div className="uk-margin">
                <Field
                  id={'passwordConfirm'}
                     name="passwordConfirm"
                     component="input"
                     type="password"
                     placeholder={formatMessage({id: "placeholders.sign_ups.confirm_password"})}
                     className={'form-control uk-input'}
                />
                {touched.passwordConfirm && errors.passwordConfirm && <div className="uk-text-warning">{errors.passwordConfirm}</div>}
              </div>
              <div className="uk-margin">
                <button className="uk-button uk-button-primary" >{formatMessage({id: "buttons.title.sign_up"})}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SignUpForm));
