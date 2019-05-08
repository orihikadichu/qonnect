import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QuestionTranslationForm from '../components/QuestionTranslationForm';
import QuestionTranslationList from '../containers/QuestionTranslationList';
import {
  fetchQuestion
} from '../actions/Question';
import {
  fetchAnswerList
} from '../actions/Answer';
import {
    postQuestionTranslationData
} from '../actions/QuestionTranslation';


class QuestionTranslationView extends Component {
  constructor(props) {
    super(props);
    const {params} = props.match;
    this.qId = parseInt(params.question_id, 10);
  }

  componentWillMount() {
    this.props.getQuestionById(this.qId);
  }

  handleSubmit(formData) {
    try {
      const { content, translate_language_id } = formData;
      if (content === '') {
        throw new Error('空文字で投稿はできません。');
      }
      const { user } = this.props.state.auth;
      const question_id = this.qId;
      const user_id = user.id;
      return this.props.handleSubmit({content, question_id, user_id, translate_language_id});
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  render() {
    const { currentQuestion } = this.props.state.questions;
    return (
      <main className="uk-container uk-container-small">
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
          <p>{currentQuestion.content}</p>
        </div>
        <h3 className="uk-heading-line"><span>翻訳一覧</span></h3>
        <QuestionTranslationForm qId={this.qId} onSubmit={this.handleSubmit.bind(this)} />
        <QuestionTranslationList qId={this.qId} />
        <hr className="uk-divider-icon" />
        <Link to="/">Top</Link>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestionById: (id) => dispatch(fetchQuestion(id)),
    fetchAnswers: (question_id) => dispatch(fetchAnswerList(question_id)),
    handleSubmit: (postData) => dispatch(postQuestionTranslationData(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTranslationView);