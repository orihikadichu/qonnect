import React from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ProfileForm from './ProfileForm';

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id, name, country_id, profile } = this.props.state.auth.user;
    console.log('user', this.props.state.auth.user);

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
    return (
      <main className="uk-container uk-container-small">
        <h2 className="uk-h3" >プロフィール編集</h2>
        
        <ProfileForm onSubmit={this.onClickSubmit.bind(this)} />

        <div className="uk-margin">
          <p><Link to="/" >Top</Link></p>
        </div>

      </main>
    );
  }
};

export default Profile;
