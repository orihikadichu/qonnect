import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import LanguageFormSelect from '../LanguageFormSelect';
import { injectIntl } from 'react-intl';
import CountryFormSelect from '../CountryFormSelect';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: ''
    };
  }

  handleImageChange(setFieldValue, e) {
    const file = e.currentTarget.files[0];
    setFieldValue("image", file);
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    const image_url = createObjectURL(file);
    this.setState({ image_url });
  }

  validate(values) {
    const { formatMessage } = this.props.intl;
    let errors = {};
    if (!values.country_id) {
      errors.country_id = formatMessage({id: "errors.profile_edit.country"});
    }
    return errors;
  }

  render() {
    const { user } = this.props.state.auth;
    const { formatMessage } = this.props.intl;
    const { id, name, profile, country_id } = user;
    const imagePreview = this.state.image_url !== ''
                       ? (<p><img src={this.state.image_url} alt="" width="200" /></p>)
                       : '';

    return (
      <Formik
      initialValues={{ id, name, profile, country_id, image: ''}}
        enableReinitialize={true}
        validate={this.validate}
        onSubmit={(values, { setSubmitting, setErrors }) => {
            this.props.onSubmit(values);
            setSubmitting(false);
            return;
        }}
        render={({ values, errors, touched, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="uk-form-stacked" >
            <fieldset className="uk-fieldset">
              <div className="uk-margin">
                <label className="uk-form-label">{formatMessage({id: "titles.profile_edit.user_name"})}</label>
                <Field
                  id={'name'}
                     name="name"
                     component="input"
                     type="text"
                     placeholder={formatMessage({id: "placeholder.profile_edit.nickname"})}
                     className={'uk-form-control uk-input'}
                />
                {touched.name && errors.name && <div>{errors.name}</div>}
              </div>
              <div className="uk-margin">
                <label className="uk-form-label">{formatMessage({id: "titles.profile_edit.birthplace"})}</label>

                <CountryFormSelect 
                  id={'counrty_id'}
                  name="country_id" 
                  placeholder={formatMessage({id: "placeholders.sign_ups.country"})} />
                {/* <LanguageFormSelect name="country_id" placeholder="出身地" /> */}

                {touched.country_id && errors.country_id && <div className="uk-text-warning">{errors.country_id}</div>}
              </div>
              <div className="uk-margin">
                <label className="uk-form-label">{formatMessage({id: "titles.profile_edit.profile"})}</label>
                <Field
                  id={'profile'}
                     name="profile"
                     component="textarea"
                     type="text"
                     placeholder={formatMessage({id: "placeholder.profile_edit.profile"})}
                     className={'uk-form-control uk-textarea'}
                     rows="5"
                />
                {touched.profile && errors.profile && <div className="uk-text-warning">{errors.profile}</div>}
              </div>
              <div className="uk-margin js-upload" uk-form-custom="true" >
                <label className="uk-form-label">{formatMessage({id: "titles.profile_edit.user_image"})}</label>
                <input id="file" name="image" type="file" onChange={this.handleImageChange.bind(this, setFieldValue)} />

                {touched.image && errors.image && <div>{errors.image}</div>}
                <button className="uk-button uk-button-default" type="button" tabIndex="-1">{formatMessage({id: "buttons.profile_edit.select"})}</button>
                {imagePreview}
              </div>
              <div className="uk-margin">
                <button type="submit" className="uk-button uk-button-primary" disabled={isSubmitting}>
                {formatMessage({id: "buttons.profile_edit.save"})}
                </button>
              </div>
            </fieldset>
          </form>
        )}
      />
    )
  }
}


const mapStateToProps = state => {
  return {
    state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProfileForm));
