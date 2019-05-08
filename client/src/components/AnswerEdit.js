import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import AnswerForm from './AnswerForm';

class AnswerEdit extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.answerId = parseInt(params.id, 10);
  }

  componentWillMount() {
    this.props.getAnswerById(this.answerId);
  }

  notOwnerWillTransfer(currentAnswer) {
    const owner = currentAnswer.user;
    const loginUser = this.props.state.auth.user;
    const { history } = this.props;
    if (owner.id !== loginUser.id) {
      return history.push('/');
    }
    return true;
  }

  handleSubmit(formData) {
    try {
      const { currentAnswer } = this.props.state.answers;
      const { content, translate_language_id, country_id } = formData;
      const { history } = this.props;
      const answer_id = this.answerId;
      const { question_id } = currentAnswer;
      /* const { translate_language_id } = currentQuestion;*/
      const saveData = { content, answer_id, translate_language_id, country_id, history, question_id };
      return this.props.handleSubmit(saveData);
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  onClickDeleteBtn(e) {
    try {
      const { user } = this.props.state.auth;
      const { currentAnswer } = this.props.state.answers;
      const { history } = this.props;
      const params = {
        user_id: user.id,
        answer_id: this.answerId,
        question_id: currentAnswer.question_id,
        history
      };
      return this.props.deleteAnswer(params);
    } catch (e) {
      return;
    }
  }

  render() {
    const { currentAnswer } = this.props.state.answers;

    if (Object.keys(currentAnswer).length === 0) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    this.notOwnerWillTransfer(currentAnswer);

    return (
      <main className="uk-container uk-container-small">
        <h2>回答の編集</h2>
        <AnswerForm initialValues={currentAnswer} onSubmit={this.handleSubmit.bind(this)} />
        <p><button className="uk-button uk-button-danger" onClick={this.onClickDeleteBtn.bind(this)}>この回答を削除</button></p>
        <Link to="/">Top</Link>
      </main>
    );
  }
}

export default AnswerEdit;
