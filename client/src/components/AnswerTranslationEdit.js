import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import TranslationEdit from './TranslationEdit';

class AnswerTranslationEdit extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.atId = parseInt(params.id, 10);
  }

  componentWillMount() {
    this.props.getAnswerTranslationById(this.atId);
  }

  handleSubmit(formData) {
    try {
      const { content, translate_language_id, country_id } = formData;
      const id = this.atId;
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
        id: this.atId,
        history
      };
      return this.props.deleteAnswerTranslation(params);
    } catch (e) {
      return;
    }
  }

  render() {
    const { currentTranslation } = this.props.state.answerTranslations;
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

export default AnswerTranslationEdit;
