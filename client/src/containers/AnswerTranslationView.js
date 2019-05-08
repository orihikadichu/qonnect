import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AnswerTranslationForm from '../components/AnswerTranslationForm';
import AnswerTranslationList from '../containers/AnswerTranslationList';
import {
  fetchAnswer,
  fetchAnswerList
} from '../actions/Answer';
import {
  postAnswerTranslationData
} from '../actions/AnswerTranslation';


class AnswerTranslationView extends Component {
  constructor(props) {
    super(props);
    const {params} = props.match;
    this.aId = parseInt(params.answer_id, 10);
  }

  componentWillMount() {
    this.props.getAnswerById(this.aId);
  }

  handleSubmit(formData) {
    try {
      const { content, translate_language_id } = formData;
      if (content === '') {
        throw new Error('空文字で投稿はできません。');
      }
      const { user } = this.props.state.auth;
      const answer_id = this.aId;
      const user_id = user.id;
      return this.props.handleSubmit({content, answer_id, user_id, translate_language_id});
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  render() {
    const { currentAnswer } = this.props.state.answers;
    const user = (currentAnswer.user) ? currentAnswer.user : null;
    const userName = (user) ? user.name : '';
    return (
      <main className="uk-container uk-container-small">
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
          <p>{currentAnswer.content}</p>
          <p>{userName}</p>
        </div>
        <h3 className="uk-heading-line"><span>翻訳一覧</span></h3>
        <AnswerTranslationForm aId={this.aId} onSubmit={this.handleSubmit.bind(this)} />
        <AnswerTranslationList aId={this.aId} />
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
    getAnswerById: (id) => dispatch(fetchAnswer(id)),
    fetchAnswers: (question_id) => dispatch(fetchAnswerList(question_id)),
    handleSubmit: (postData) => dispatch(postAnswerTranslationData(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerTranslationView);
