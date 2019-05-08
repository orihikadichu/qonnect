import React, { Component } from 'react';
import { Formik } from 'formik';
import TranslationFormFieldSet from './TranslationFormFieldSet';

class CommentTranslatinoForm extends Component {

  validate(values) {
    let errors = {};
    if (!values.content) {
      errors.content = '翻訳を入力してください';
    }
    if (!values.translate_language_id) {
      errors.translate_language_id = '投稿言語を指定してください';
    }
    return errors;
  }

  render() {
    return (
      <Formik
        initialValues={{
          content: '',
          translate_language_id: ''
        }}
        validate={this.validate}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
            this.props.onSubmit(values);
            setSubmitting(false);
            resetForm();
            return;
        }}
        render={({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit} >
            <TranslationFormFieldSet />
          </form>
        )}
      />
    );
  }
}

export default CommentTranslatinoForm;
