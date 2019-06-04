import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import LanguageFormSelect from './LanguageFormSelect';
import { injectIntl } from 'react-intl';

class QuestionTranslatinoForm extends Component {

  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};
    if (!values.content) {
      errors.content = formatMessage({id: "errors.translations.content"});
    }
    if (!values.translate_language_id) {
      errors.translate_language_id = formatMessage({id: "errors.translations.translate_language_id"});
    }
    return errors;
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Formik
        initialValues={{
          content: '',
          translate_language_id: ''
        }}
        validate={this.validate.bind(this)}
        enableReinitialize={true}
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
                     placeholder={formatMessage({id: 'placeholders.translations.content'})}
                     rows="5"
                     className={'form-control uk-textarea'}
                />
              </div>
              {touched.content && errors.content && <div className="uk-text-warning">{errors.content}</div>}
              <div className="uk-margin">
                <LanguageFormSelect name="translate_language_id" placeholder={formatMessage({id: "placeholders.translations.translate_language_id"})} />
                {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning">{errors.translate_language_id}</div>}

              </div>
              <div className="uk-margin">
                <button className="uk-button uk-button-default" >{formatMessage({id: "buttons.title.post"})}</button>
              </div>
            </fieldset>
          </form>
        )}
      />
    );
  }
}

export default injectIntl(QuestionTranslatinoForm);
