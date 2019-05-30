import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import { connect } from 'react-redux';
import LanguageFormSelect from './LanguageFormSelect';

class CommentForm extends Component {

  validate(values) {
    let errors = {};
    if (!values.content) {
      errors.content = 'コメントが空欄です';
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
        // validate={this.validate.bind(this)}

        validate={this.validate}
        onSubmit={(values, { setSubmitting, setErrors }) => {
            return this.props.onSubmit(values);
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
                     placeholder="コメントを入力してください"
                     rows="3"
                     className={'form-control uk-textarea'}
                />
                {touched.content && errors.content && <div className="uk-text-warning">{errors.content}</div>}
              </div>
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

const mapStateToProps = (state, ownProps) => {
  return {
    state
  };
};

export default connect(mapStateToProps)(CommentForm);

