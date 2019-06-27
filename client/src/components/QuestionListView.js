import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { getFilteredContents, getTranslatedContents } from '../utils/Translations';
import { injectIntl } from 'react-intl';
import { sprintf } from 'sprintf-js';
import Translator from './Translator';
//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote, deleteVote } from '../actions/Vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostUser from './PostUser';
import PostIcons from './PostIcons';

class QuestionListView extends Component {

  sendVote(data, user_id) {
    if (user_id == null) {
        return;
    }
    return this.props.handlePostVote(data);
  }

  deleteVote(data, user_id) {
      if (user_id == null) {
          return;
      }
      return this.props.handleDeleteVote(data);
  }

  getQuestionList(questionArray, translateLanguageId, categoryId) {
    const contentType = 'question_translations';
    const filteredQuestions = getFilteredContents(questionArray, translateLanguageId, contentType, categoryId);
    const translatedQuestions = getTranslatedContents(filteredQuestions, translateLanguageId, contentType, categoryId);

    return translatedQuestions.map(question => {
      const { user } = question;
      const { formatMessage } = this.props.intl

      const { votes } = question;

      const key = "questionList";
      const sendVoteParams = {
          user_id: this.props.user.id,
          question_id: question.id,
          answer_id: null,
          comment_id: null,
          status: 1,
      };
      const deleteVoteParams = {
          user_id: this.props.user.id,
          key : "question",
          vote_id: question.id,
      };
      const sendData = { sendVoteParams,  key };
      const deleteData = { deleteVoteParams,  key };

      const { question_translations } = question;
      let translator;
      translator = (
        <h4 className="uk-comment-meta uk-text-right">
          { formatMessage({id: "translated.state" })}
        </h4>
      );
      if (question_translations.length !== 0) {
        const { user } = question_translations[0];
        translator = <Translator user={user} />;
      }

      return (
        <li key={question.id} >
          <p>
            <span className="uk-text-muted">{ formatMessage({id: question.category.intl_key })}</span>
            <span className="uk-text-meta uk-margin-small-left">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</span>
          </p>
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          <div className="button-area uk-margin-bottom" >
          <PostIcons 
              //コンテンツのユーザー
              user = { user } 
              //ログインユーザー
              loginUser = { this.props.user  } 
              votes = { votes }
              sendData = { sendData }
              deleteData = { deleteData }
              editLink = {`/questions/edit/${question.id}`}
              translateLink = {`/question_translations/${question.id}`}
              onClickSendVote = {this.sendVote.bind(this)}
              onClickDeleteVote = {this.deleteVote.bind(this)}
              translate = { true }
          />
          </div>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div>
              <PostUser user={user} />
            </div>
            <div className="uk-width-expand" >
              { translator }
            </div>
          </div>
        </li>
      )
    });
  }

  getQuestionListView(questionArray, translateLanguageId, categoryId) {
    const questionList = this.getQuestionList(questionArray, translateLanguageId, categoryId);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {questionList}
        </ul>
      </div>
    );
  }

  render() {
    const { questionArray, translateLanguageId, categoryId } = this.props;
    const content = this.getQuestionListView(questionArray, translateLanguageId, categoryId);

    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { categoryId } = state.ctgr;
  const { intl } = state;

  return {
    user,
    categoryId,
    intl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //評価機能
    handlePostVote: (data) => dispatch(postVote(data)),
    handleDeleteVote: (data) => dispatch(deleteVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionListView));
