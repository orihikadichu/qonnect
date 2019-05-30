import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote } from '../actions/Vote';

class QuestionListView extends Component {

  getFilteredQuestions(questionArray, translateLanguageId) {
    const filteredQuestions = questionArray.filter((v) => {
      if (v.translate_language_id === translateLanguageId) {
        return true;
      }
      const targetTranslationsNum = v.question_translations.filter((v) => {
        return (v.translate_language_id === translateLanguageId);
      }).length;
      return (targetTranslationsNum !== 0);
    });
    return filteredQuestions;
  }
  
  getTranslatedQuestions(questions, translateLanguageId) {
    const translatedQuestions = questions.map((v) => {
      if (v.translate_language_id === translateLanguageId) {
        v.dispText = v.content;
        return v;
      }
      const questionTranslation = v.question_translations.filter(v => {
        return (v.translate_language_id === translateLanguageId);
      })[0];

      v.dispText = questionTranslation.content;
      return v;
    });
    return translatedQuestions;
  }

  sendVote(questionId){
    const postData = {
      user_id: this.props.user.id,
      question_id: questionId,
      answer_id: null,
      comment_id: null,
      status: 1,
    };
    return this.props.handlePostVote(postData);
  }

  getQuestionList(questionArray, translateLanguageId) {

    const filteredQuestions = this.getFilteredQuestions(questionArray, translateLanguageId);
    const translatedQuestions = this.getTranslatedQuestions(filteredQuestions, translateLanguageId);

    return translatedQuestions.map(question => {
      const { user } = question;
      const userName = user ? user.name : '不明なユーザー';
      const profileLink = `/users/profile/${user.id}`;
      return (
        <li key={question.id} >
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          {/* 評価機能のボタン */}
          <button className="uk-button uk-button-default" onClick={this.sendVote.bind(this, question.id)}>
             <span uk-icon="star">QuestionListView</span>
          </button>
          <p className="uk-text-meta">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              {/* <img className="uk-comment-avatar uk-border-circle" src='/image/blank-profile.png' width="35" height="35" alt="" /> */}
              <Link to={profileLink}><img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" /></Link>
            </div>
            <div className="uk-width-expand">
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={profileLink}>{ userName }</Link></h4>
            </div>
          </div>
        </li>
      )
    });
  }

  getQuestionListView(questionArray, translateLanguageId) {
    const questionList = this.getQuestionList(questionArray, translateLanguageId);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {questionList}
        </ul>
      </div>
    );
  }

  render() {

    const { questionArray, translateLanguageId } = this.props;
    const content = this.getQuestionListView(questionArray, translateLanguageId);

    return (
      <div>
        {content}
      </div>
    );
  }
}

// export default QuestionListView;

//stateの中からauthだけを取り出す。
const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
      //評価機能
      handlePostVote: (data) => dispatch(postVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(QuestionListView);