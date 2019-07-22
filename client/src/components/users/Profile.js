import React from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ProfileForm from './ProfileForm';
import { injectIntl } from 'react-intl';

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id, name, country_id, profile } = this.props.state.auth.user;

    this.setState({
      user_id: id,
      name,
      profile,
      country_id
    });
  }

  onClickSubmit(formData) {
    const { id, name, profile, country_id, image } = formData;

    const postData = {
      user_id: id,
      name,
      profile,
      country_id,
      image
    };
    this.props.clickedSaveButton(postData);
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >{formatMessage({id: "titles.profile.edit"})}</h2>
        
        <ProfileForm onSubmit={this.onClickSubmit.bind(this)} />

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>

      </main>
    );
  }
};

export default injectIntl(Profile);