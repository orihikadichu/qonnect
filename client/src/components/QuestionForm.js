import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import LanguageFormSelect from './LanguageFormSelect';
import CategoryFormSelect from './CategoryFormSelect';
import { injectIntl } from 'react-intl';

class QuestionForm extends Component {

  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};
    if (!values.content) {
      errors.content = formatMessage({id: "errors.questions.content"});
    }
    if (!values.country_id) {
      errors.country_id = formatMessage({id: "errors.questions.country_id"});
    }
    if (!values.translate_language_id) {
      errors.translate_language_id = formatMessage({id: "errors.questions.translate_language_id"});
    }
    if (!values.category_id) {
      errors.category_id = formatMessage({id: "errors.questions.category_id"});
    }
    return errors;
  }

  render() {
    const { initialValues } = this.props;
    const { formatMessage } = this.props.intl;
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
                     placeholder={formatMessage({id: 'placeholders.questions.content'})}
                     rows="5"
                     className={'form-control uk-textarea'}
                />
                {touched.content && errors.content && <div className="uk-text-warning">{errors.content}</div>}
              </div>
              <div className="uk-margin uk-grid uk-grid-small uk-child-width-expand@s" >
                <div className="uk-grid-margin" >
                  <Field name="country_id" component="select" className={'form-control uk-select'}>
                    <option value="">{formatMessage({id: "placeholders.questions.country_id"})}</option>
                    <option value="1" >{ formatMessage({id: "countries.japan" })}</option>
                    <option value="2" >{ formatMessage({id: "countries.usa" })}</option>
                  </Field>
                  {touched.country_id && errors.country_id && <div className="uk-text-warning">{errors.country_id}</div>}
                </div>
                <div className="uk-grid-margin" >
                  <LanguageFormSelect name="translate_language_id" placeholder={formatMessage({id: "placeholders.questions.translate_language_id"})} />
                  {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning">{errors.translate_language_id}</div>}
                </div>
                {/* カテゴリー指定 */}
                <div className="uk-grid-margin" >
                  <CategoryFormSelect name="category_id" placeholder={formatMessage({id: "placeholders.questions.category_id"})} />
                  {touched.category_id && errors.category_id && <div className="uk-text-warning">{errors.category_id}</div>}
                </div>
              </div>
              <div className="uk-margin">
                <button type="submit" className="uk-button uk-button-default" >{formatMessage({id: "placeholders.questions.submit_btn"})}</button>
              </div>
            </fieldset>
          </form>
        )}
      />
    );
  }
}

export default injectIntl(QuestionForm);
