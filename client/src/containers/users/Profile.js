import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/User';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.userId = parseInt(params.id, 10);
    this.props.fetchUserProfile(this.userId);
  }

  render() {
    // とりあえずログインユーザーのプロフィールページを。
    // propsで渡されたuserIdのプロフィールページを表示するようにする。
    const { user } = this.props.state.profile;

    if (Object.keys(user).length === 0) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    return (
      <main className="uk-container uk-container-small">
        <p><img src={user.image_path} className="uk-border-circle" alt="" width="100" height="100" /></p>
        <p className="uk-text-lead">{user.name}</p>
        <p style={{"whiteSpace": "pre-wrap"}}>{user.profile}</p>
        <p>出身地</p>
        <p>{user.country.name}</p>
      </main>
    );
  }
}

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
      fetchUserProfile: (userId) => dispatch(getUserProfile(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
