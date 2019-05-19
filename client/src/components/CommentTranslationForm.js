import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import LanguageFormSelect from './LanguageFormSelect';

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
            <fieldset className="uk-fieldset">
              <div className="uk-margin">
                <Field
                  id={'content'}
                     name="content"
                     component="textarea"
                     type="text"
                     placeholder="翻訳を入力してください"
                     rows="5"
                     className={'form-control uk-textarea'}
                />
              </div>
              {touched.content && errors.content && <div className="uk-text-warning">{errors.content}</div>}
              <div className="uk-margin">
                <LanguageFormSelect name="translate_language_id" placeholder="投稿言語" />
                {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning">{errors.translate_language_id}</div>}

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

export default CommentTranslatinoForm;
