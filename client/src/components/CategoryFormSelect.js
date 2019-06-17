import React, { Component } from 'react';
import { Field } from 'formik';
import { injectIntl } from 'react-intl';

class CategoryFormSelect extends Component {
  render() {
    const { formatMessage } = this.props.intl;
    const { name, placeholder } =  this.props;
    
    return (
      <Field name={name} component="select" className={'form-control uk-select'}>
        <option value="">{placeholder}</option>
        <option value="1" >{ formatMessage({id: "categories.subculture" })}</option>
        <option value="2" >{ formatMessage({id: "categories.culture" })}</option>
        <option value="3" >{ formatMessage({id: "categories.tourism" })}</option>
        <option value="4" >{ formatMessage({id: "categories.music" })}</option>
      </Field>
    );
  }
}

export default injectIntl(CategoryFormSelect);
