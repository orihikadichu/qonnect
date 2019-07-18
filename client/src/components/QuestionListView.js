import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { getTranslatedContents } from '../utils/Translations';
import { injectIntl } from 'react-intl';
import { sprintf } from 'sprintf-js';
import Translator from './Translator';
import { connect } from 'react-redux';

import { postVote, deleteVote, handleVote } from '../actions/Vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostUser from './PostUser';
import PostIcons from './PostIcons';
import PostAnswerCount from './PostAnswerCount';

class QuestionListView extends Component {

  getOnClickPostVote(voteParams, loginUserId) {
    return () => {
      if (loginUserId == null) {
        return;
      }
      const ACTION_TYPE_VOTE = 6;
      voteParams.action_type_id = ACTION_TYPE_VOTE;
      return this.props.handleVote(voteParams);
    };
  }

  getTranslator(question_translations, formatMessage) {
    const defaultElem = (
      <h4 className="uk-comment-meta uk-text-right">
        { formatMessage({id: "translated.state" })}
      </h4>
    );

    if (question_translations.length === 0) {
      return defaultElem;
    }

    const { user } = question_translations[0];
    return <Translator user={user} />;
  }

  categoryFilteredContents(array, id) {

    const CREATED_ALL = 0;
    const CREATED_COMIC_ANIME = 1;
    const CREATED_CULTURE = 2;
    const CREATED_TOURISM = 3;
    const CREATED_MUSIC = 4;

    switch(id) {
      case CREATED_ALL :
        return array;
      case CREATED_COMIC_ANIME :
      case CREATED_CULTURE :
      case CREATED_TOURISM :
      case CREATED_MUSIC :
        return array.filter((e)=>{
          return e.category_id === id;
        });
      default:
        return [];
    }
  }

  sortFilteredContents(categoryQuestions, sortId) {
    const CREATED_ANSWER_MANY = 1;
    const CREATED_ANSWER_FEW = 2;
    const CREATED_CREATED_ASC = 3;
    const CREATED_CREATED_DES = 4;

    const editArray = categoryQuestions.map(v => {
      return {"num": v.answers.length, "question": v};
    });

    switch(sortId) {
      case CREATED_ANSWER_MANY :
        return editArray.sort(function(a,b) {
          return (a.num < b.num ? 1 : -1);
        }).map((e)=>{ return e.array});
      case CREATED_ANSWER_FEW :
        return editArray.sort(function(a,b) {
          return (a.num > b.num ? 1 : -1);
        }).map((e)=>{ return e.array})
      case CREATED_CREATED_ASC :
        return categoryQuestions.sort(function(a,b) {
          return (a.created_at < b.created_at ? 1 : -1);
        });
      case CREATED_CREATED_DES :
        return categoryQuestions.sort(function(a,b) {
          return (a.created_at > b.created_at ? 1 : -1);
        });
      default:
        return [];
    }
  }

  getQuestionList(questionArray, translateLanguageId, categoryId, sortId) {

    const contentType = 'question_translations';
    const translatedQuestions = getTranslatedContents(questionArray, translateLanguageId, contentType);
    const categoryQuestions = this.categoryFilteredContents(translatedQuestions, categoryId);
    const sortQuestions = this.sortFilteredContents(categoryQuestions, sortId);

    return sortQuestions.map(question => {
      const { user } = question;
      const { formatMessage } = this.props.intl
      const { answers } = question;
      const { votes } = question;
      const userData = this.props.user;

      const myVoteList = votes.filter(v => v.user_id === userData.id);
      const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

      const voteState = (myVoteList.length === 0);
      const voteParams = (voteState)
                       ? {
                         postActionType:"post",
                         thisPageKey: "questionList",
                         user_id: this.props.user.id,
                         question_id: question.id,
                         answer_id: null,
                         comment_id: null,
                         status: 1,
                       } : {
                         postActionType:"delete",
                         thisPageKey: "questionList",
                         user_id: this.props.user.id,
                         deleteColumnKey : "question",
                         vote_id: question.id,
                         voteIdForPoint: myVoteId,
                       };
      const handleSubmit = this.getOnClickPostVote(voteParams, this.props.user.id).bind(this);

      const { question_translations } = question;
      const translator = this.getTranslator(question_translations, formatMessage);

      const  contentCount = answers.length !==0
                          ? <PostAnswerCount reply={ answers } />
                          : "";

      return (
        <li key={question.id} >
          <p>
            <span className="uk-text-muted">{ formatMessage({id: question.category.intl_key })}</span>
            <span className="uk-text-meta uk-margin-small-left">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</span>
          </p>
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          <div className="button-area uk-margin-bottom" >
            <PostIcons
              user = { user }
              loginUser = { this.props.user  }
              votes = { votes }
              voteState = { voteState }
              onClickHandleVote = { handleSubmit }
              editLink = {`/questions/edit/${question.id}`}
              translateLink = {`/question_translations/${question.id}`}
              translate = { true }
            />
          </div>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div>
              <PostUser user={user} />
            </div>
            <div>
              { contentCount }
            </div>
            <div className="uk-width-expand" >
              { translator }
            </div>
          </div>
        </li>
      )
    });
  }

  render() {
    const { questionArray, translateLanguageId, categoryId, sortId } = this.props;
    const questionList = this.getQuestionList(questionArray, translateLanguageId, categoryId, sortId);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {questionList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { categoryId } = state.ctgr;
  const { sortId } = state.sort;
  const { intl } = state;

  return {
    user,
    categoryId,
    sortId,
    intl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // handlePostVote: (data) => dispatch(postVote(data)),
    // handleDeleteVote: (data) => dispatch(deleteVote(data)),
    handleVote: (data) => dispatch(handleVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionListView));
