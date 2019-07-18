import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import LanguageFormSelect from './LanguageFormSelect';
import CategoryFormSelect from './CategoryFormSelect';
import { injectIntl } from 'react-intl';
import { Persist } from 'formik-persist';
import CountryFormSelect from './CountryFormSelect';

class QuestionForm extends Component {

  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};
    if (!values.content) {
      errors.content = "errors.questions.content";
    }
    if (!values.country_id) {
      errors.country_id = "errors.questions.country_id";
    }
    if (!values.translate_language_id) {
      errors.translate_language_id = "errors.questions.translate_language_id";
    }
    if (!values.category_id) {
      errors.category_id = "errors.questions.category_id";
    }
    return errors;
  }

  render() {
    const { initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    const persistTab = this.props.fromName === "questionForm"
      ? <Persist name={this.props.fromName} />
      : "";

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
                  placeholder={formatMessage({ id: 'placeholders.questions.content' })}
                  rows="5"
                  className={'form-control uk-textarea'}
                />
                {touched.content && errors.content && <div className="uk-text-warning">{formatMessage({ id: errors.content })}</div>}
                {/* {touched.content && errors.content && <div className="uk-text-warning">{errors.content}</div>} */}
                {persistTab}
              </div>
              <div className="uk-margin uk-grid uk-grid-small uk-child-width-expand@s" >
                <div className="uk-grid-margin" >

                  <CountryFormSelect
                    id={'counrty_id'}
                    name="country_id"
                    placeholder={formatMessage({ id: "placeholders.questions.country_id" })} />

                  {touched.country_id && errors.country_id && <div className="uk-text-warning">{formatMessage({ id: errors.country_id })}</div>}
                  {/* {touched.country_id && errors.country_id && <div className="uk-text-warning">{errors.country_id}</div>} */}
                </div>
                <div className="uk-grid-margin" >
                  <LanguageFormSelect name="translate_language_id" placeholder={formatMessage({ id: "placeholders.questions.translate_language_id" })} />
                  {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning">{formatMessage({ id: errors.translate_language_id })}</div>}
                  {/* {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning">{errors.translate_language_id}</div>} */}
                </div>

                <div className="uk-grid-margin" >
                  <CategoryFormSelect name="category_id" placeholder={formatMessage({ id: "placeholders.questions.category_id" })} />
                  {touched.category_id && errors.category_id && <div className="uk-text-warning">{formatMessage({ id: errors.category_id })}</div>}
                  {/* {touched.category_id && errors.category_id && <div className="uk-text-warning">{errors.category_id}</div>} */}
                </div>
              </div>
              <div className="uk-margin">
                <button type="submit" className="uk-button uk-button-default" >{formatMessage({ id: "placeholders.questions.submit_btn" })}</button>
              </div>
            </fieldset>
          </form>
        )}
      />
    );
  }
}

export default injectIntl(QuestionForm);