import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import LanguageFormSelect from './LanguageFormSelect';

class TranslationForm extends Component {

  validate(values) {
    let errors = {};
    if (!values.content) {
      errors.content = '翻訳文を入力してください';
    }
    if (!values.translate_language_id) {
      errors.translate_language_id = '投稿言語を指定してください';
    }
    return errors;
  }

  render() {
    const { initialValues } = this.props;
    return (
      <Formik
        initialValues={initialValues}
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
                  id={'content'}
                     name="content"
                     component="textarea"
                     type="text"
                     placeholder="翻訳文を入力してください"
                     rows="5"
                     className={'form-control uk-textarea'}
                />
                {touched.content && errors.content && <div className="uk-text-warning">{errors.content}</div>}
              </div>
              <div className="uk-margin uk-grid uk-grid-small uk-child-width-expand@s" >
                <div className="uk-grid-margin" >
                  <LanguageFormSelect name="translate_language_id" placeholder="投稿言語" />
                  {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning">{errors.translate_language_id}</div>}
                </div>
              </div>
              <div className="uk-margin">
                <button className="uk-button uk-button-default" >投稿</button>
              </div>
            </fieldset>
          </form>
        )}
      />
    );
  }
}

export default TranslationForm;
