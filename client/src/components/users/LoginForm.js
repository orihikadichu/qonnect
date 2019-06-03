import React from 'react';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import { injectIntl } from 'react-intl';

class LoginForm extends React.Component {
  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};

    if (!values.mail) {
      errors.mail = formatMessage({id: "errors.login.mail"});
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
      errors.mail = formatMessage({id: "errors.login.appropriate_mail"});
    }

    if (!values.password) {
      errors.password = formatMessage({id: "errors.login.password"});
    }

    return errors;
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Formik
        initialValues={{
          mail: '',
          password: ''
        }}
        enableReinitialize={true}
        validate={this.validate.bind(this)}
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
                     placeholder={formatMessage({id: "placeholders.login.mail"})}
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
                     placeholder={formatMessage({id: "placeholders.login.password"})}
                     className={'form-control uk-input'}
                />
                {touched.password && errors.password && <div className="uk-text-warning">{errors.password}</div>}
              </div>
              <div className="uk-margin">
                <button type="submit" className="uk-button uk-button-primary" >{formatMessage({id: "buttons.title.login"})}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LoginForm));
