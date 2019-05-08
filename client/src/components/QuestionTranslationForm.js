import React, { Component } from 'react';
import { Formik } from 'formik';
import TranslationFormFieldSet from './TranslationFormFieldSet';

class QuestionTranslatinoForm extends Component {

  render() {
    const { handleSubmit } = this.props;

    return (
      <Formik
        initialValues={{
          content: '',
          translate_language_id: ''
        }}
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

export default QuestionTranslatinoForm;
