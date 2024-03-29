import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import { isEmptyObject } from '../utils';
import { injectIntl } from 'react-intl';

class QuestionEdit extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.qId = parseInt(params.id, 10);
  }

  componentWillMount() {
    console.log("発火")
    this.props.getQuestionById(this.qId);
  }

  notOwnerWillTransfer(currentQuestion) {
    const owner = currentQuestion.user;
    const loginUser = this.props.state.auth.user;
    const { history } = this.props;
    if (owner.id !== loginUser.id) {
      return history.push('/');
    }
    return true;
  }

  handleSubmit(formData) {
    try {
      const { content, translate_language_id, country_id } = formData;
      const question_id = this.qId;
      /* const { translate_language_id } = currentQuestion;*/
      const saveData = { content, question_id, translate_language_id, country_id };
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
        question_id: this.qId,
        history
      };
      return this.props.deleteQuestion(params);
    } catch (e) {
      return;
    }
  }s

  render() {
    const { currentQuestion } = this.props.state.questions;
    const { formatMessage } = this.props.intl;

    if(currentQuestion.length===0){
      return;
    };

    if (isEmptyObject(currentQuestion)) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    this.notOwnerWillTransfer(currentQuestion);

    return (
      <main className="uk-container uk-container-small">
        <h2>{ formatMessage({id: "titles.question.edit" })}</h2>
        <QuestionForm initialValues={currentQuestion} onSubmit={this.handleSubmit.bind(this)}/>
        <p><button className="uk-button uk-button-danger" onClick={this.onClickDeleteBtn.bind(this)}>{ formatMessage({id: "titles.question.delete" })}</button></p>
        <Link to="/">{ formatMessage({id: "titles.question.return" })}</Link>
      </main>
    );
  }
}

export default injectIntl(QuestionEdit);