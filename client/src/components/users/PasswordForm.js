import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import { injectIntl } from 'react-intl';

class PasswordForm extends Component {
  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};

    if (!values.password) {
      errors.password = formatMessage({id: "errors.sign_ups.password"});
    }

    if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = formatMessage({id: "errors.sign_ups.confirm_password"});
    }

    return errors;
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Formik
        initialValues={{
          password: '',
          passwordConfirm: ''
        }}
        enableReinitialize={true}
        validate={this.validate.bind(this)}
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
                <button className="uk-button uk-button-primary" >{formatMessage({id: "buttons.title.send"})}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PasswordForm));
