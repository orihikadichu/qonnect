import React, { Component } from 'react';
import { Field } from 'formik';
import LanguageFormSelect from './LanguageFormSelect';

class TranslationFormFieldSet extends Component {

  render() {
    return (
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
        <div className="uk-margin">
          <LanguageFormSelect name="translate_language_id" placeholder="投稿言語" />
        </div>
        <div className="uk-margin">
          <button className="uk-button uk-button-default" >投稿</button>
        </div>
      </fieldset>
    );
  }
}

export default TranslationFormFieldSet;
