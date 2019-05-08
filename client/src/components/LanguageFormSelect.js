import React, { Component } from 'react';
import { Field } from 'formik';

class LanguageFormSelect extends Component {
  render() {
    const { name, placeholder } =  this.props;

    return (
      <Field name={name} component="select" className={'form-control uk-select'}>
        <option value="">{placeholder}</option>
        <option value="1" >日本語</option>
        <option value="2" >英語</option>
      </Field>
    );
  }
}

export default LanguageFormSelect;
