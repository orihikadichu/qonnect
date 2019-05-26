import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import TranslationEdit from './TranslationEdit';


class CommentTranslationEdit extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.ctId = parseInt(params.id, 10);
  }

  componentWillMount() {
    console.log('getCommentTranslationById');
    this.props.getCommentTranslationById(this.ctId);
  }

  handleSubmit(formData) {
    try {
      const { content, translate_language_id, country_id } = formData;
      const id = this.ctId;
      /* const { translate_language_id } = currentTranslation;*/
      const saveData = { content, id, translate_language_id, country_id };
      return this.props.handleSubmit(saveData);
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  onClickDeleteBtn(e) {
    try {
      const { user } = this.props.state.auth;
      const { history } = this.props;
      const params = {
        user_id: user.id,
        id: this.ctId,
        history
      };
      return this.props.deleteCommentTranslation(params);
    } catch (e) {
      return;
    }
  }

  render() {
    const { currentTranslation } = this.props.state.commentTranslations;
    const loginUser = this.props.state.auth.user;

    return (
      <TranslationEdit
        currentTranslation={currentTranslation}
        handleSubmit={this.handleSubmit.bind(this)}
        onClickDeleteBtn={this.onClickDeleteBtn.bind(this)}
        loginUser={loginUser}
      />
    );
  }
}

export default CommentTranslationEdit;
