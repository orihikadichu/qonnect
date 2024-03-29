import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import LanguageFormSelect from './LanguageFormSelect';
import { injectIntl } from 'react-intl';

//<AnswerForm qId={this.qId} initialValues={answerFormInitVals} onSubmit={this.handleSubmit.bind(this)} />
//この中のqId={this.qId} initialValues={answerFormInitVals} onSubmit={this.handleSubmit.bind(this)は
//props（プロパティーの中に)入る。props.qIdという形式で値を取り出すことができる。

class AnswerForm extends Component {

  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};
    if (!values.content) {
      errors.content = formatMessage({id: "errors.answers.content"});
    }
    if (!values.translate_language_id) {
      errors.translate_language_id = formatMessage({id: "errors.answers.translate_language_id"});
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
                     placeholder={formatMessage({id: 'placeholders.answers.content'})}
                     rows="5"
                     className={'form-control uk-textarea'}
                />
                {touched.content && errors.content && <div className="uk-text-warning" >{errors.content}</div>}
              </div>
              <div className="uk-grid-margin" >
                <LanguageFormSelect name="translate_language_id" placeholder={formatMessage({id: 'placeholders.answers.translate_language_id'})} />
                {touched.translate_language_id && errors.translate_language_id && <div className="uk-text-warning" >{errors.translate_language_id}</div>}
              </div>
              <div className="uk-margin">
                <button className="uk-button uk-button-default" >{formatMessage({id: "placeholders.answers.submit_btn"})}</button>
              </div>
            </fieldset>
          </form>
        )}
      />
    );
  }
}

export default injectIntl(AnswerForm);
