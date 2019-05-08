import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Formik } from 'formik';
import LanguageFormSelect from '../LanguageFormSelect';

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
    let errors = {};
    if (!values.country_id) {
      errors.country_id = '出身地を設定してください';
    }
    return errors;
  }

  render() {
    const { user } = this.props.state.auth;
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
                <label className="uk-form-label">ユーザー名</label>
                <Field
                  id={'name'}
                     name="name"
                     component="input"
                     type="text"
                     placeholder="ニックネーム"
                     className={'uk-form-control uk-input'}
                />
                {touched.name && errors.name && <div>{errors.name}</div>}
              </div>
              <div className="uk-margin">
                <label className="uk-form-label">出身地</label>
                <LanguageFormSelect name="country_id" placeholder="出身地" />
                {touched.country_id && errors.country_id && <div className="uk-text-warning">{errors.country_id}</div>}
              </div>
              <div className="uk-margin">
                <label className="uk-form-label">プロフィール</label>
                <Field
                  id={'profile'}
                     name="profile"
                     component="textarea"
                     type="text"
                     placeholder="プロフィールを入力してください"
                     className={'uk-form-control uk-textarea'}
                     rows="5"
                />
                {touched.profile && errors.profile && <div className="uk-text-warning">{errors.profile}</div>}
              </div>
              <div className="uk-margin js-upload" uk-form-custom="true" >
                <label className="uk-form-label">プロフィール画像</label>
                <input id="file" name="image" type="file" onChange={this.handleImageChange.bind(this, setFieldValue)} />

                {touched.image && errors.image && <div>{errors.image}</div>}
                <button className="uk-button uk-button-default" type="button" tabIndex="-1">選択</button>
                {imagePreview}
              </div>
              <div className="uk-margin">
                <button type="submit" className="uk-button uk-button-primary" disabled={isSubmitting}>
                  保存
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
