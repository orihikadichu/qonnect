import React, { Component } from 'react';
import { Field } from 'formik';
import { injectIntl } from 'react-intl';

class LanguageFormSelect extends Component {
  render() {
    const { formatMessage } = this.props.intl;
    const { name, placeholder, value } =  this.props;

    return (
      <Field name={name} value={value} component="select" className={'form-control uk-select'}>
        <option value="">{placeholder}</option>
        <option value="1">{ formatMessage({id: "languages.japanese" })}</option>
        <option value="2">{ formatMessage({id: "languages.english" })}</option>
      </Field>
    );
  }
}

export default injectIntl(LanguageFormSelect);
