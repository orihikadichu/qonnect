import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import { connect } from 'react-redux';
import LanguageFormSelect from './LanguageFormSelect';
import { Persist } from 'formik-persist';
import { injectIntl } from 'react-intl';

class CommentForm extends Component {

  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};
    if (!values.content) {
      errors.content = formatMessage({id: "errors.comments.content"});
    }
    if (!values.translate_language_id) {
      errors.translate_language_id = formatMessage({id: "errors.comments.translate_language_id"});
    }
    return errors;
  }

  render() {
    const { initialValues, state } = this.props;
    const { formatMessage } = this.props.intl;
    const buttonStr = formatMessage({id: 'placeholders.comments.submit_btn'});
    const postButton = state.auth.isLoggedIn
                     ? <div className="uk-margin"><button className="uk-button uk-button-default" >{buttonStr}</button></div>
                     : <a class="uk-button uk-button-default" href='/users/login'>{buttonStr}</a>;

    return (
      <Formik
        initialValues={initialValues}
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
                  id={'content'}
                     name="content"
                     component="textarea"
                     type="text"
                     placeholder={formatMessage({id: 'placeholders.comments.content'})}
                     rows="3"
                     className={'form-control uk-textarea'}
                />
                <Persist name={`"comment-form"${values.answer_id}`}/>
                {touched.content && errors.content && <div className="uk-text-warning">{errors.content}</div>}
              </div>
              <div className="uk-margin">
                <LanguageFormSelect name="translate_language_id" placeholder={formatMessage({id: 'placeholders.comments.translate_language_id'})} />
                {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning">{errors.translate_language_id}</div>}
              </div>
              {postButton}
            </fieldset>
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state
  };
};

export default connect(mapStateToProps)(injectIntl(CommentForm));

