import React, { Component } from 'react';
import { Field } from 'formik';
import { injectIntl } from 'react-intl';

class CountryFormSelect extends Component {
  render() {
    const { formatMessage } = this.props.intl;
    const { id, name, placeholder } =  this.props;

    return (
      <Field id={id} name={name} component="select" className={'form-control uk-select'}>
        <option value="">{placeholder}</option>
        <option value="1" >{ formatMessage({id: "countries.japan" })}</option>
        <option value="2" >{ formatMessage({id: "countries.usa" })}</option>
        <option value="3" >{ formatMessage({id: "countries.philippines" })}</option>
        <option value="4" >{ formatMessage({id: "countries.england" })}</option>
        <option value="5" >{ formatMessage({id: "countries.newzealand" })}</option>
      </Field>
    );
  }
}

export default injectIntl(CountryFormSelect);