import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { getTranslatedContents } from '../utils/Translations';
import { injectIntl } from 'react-intl';
import { sprintf } from 'sprintf-js';
import Translator from './Translator';
import { connect } from 'react-redux';

import { handleVote } from '../actions/Vote';
import QuestionContent from './QuestionContent';

class QuestionListView extends Component {
  categoryFilteredContents(array, id) {

    const CREATED_ALL = 0;
    const CREATED_COMIC_ANIME = 1;
    const CREATED_CULTURE = 2;
    const CREATED_TOURISM = 3;
    const CREATED_MUSIC = 4;

    switch (id) {
      case CREATED_ALL:
        return array;
      case CREATED_COMIC_ANIME:
      case CREATED_CULTURE:
      case CREATED_TOURISM:
      case CREATED_MUSIC:
        return array.filter((e) => {
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
      return { "num": v.answers.length, "question": v };
    });

    switch (sortId) {
      case CREATED_ANSWER_MANY:
        return editArray.sort(function (a, b) {
          return (a.num < b.num ? 1 : -1);
        }).map((e) => { return e.array });
      case CREATED_ANSWER_FEW:
        return editArray.sort(function (a, b) {
          return (a.num > b.num ? 1 : -1);
        }).map((e) => { return e.array })
      case CREATED_CREATED_ASC:
        return categoryQuestions.sort(function (a, b) {
          return (a.created_at < b.created_at ? 1 : -1);
        });
      case CREATED_CREATED_DES:
        return categoryQuestions.sort(function (a, b) {
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
    const { formatMessage } = this.props.intl;
    const userData = this.props.user;

    return sortQuestions.map(question =>
      <QuestionContent
        question={question}
        formatMessage={formatMessage}
        userData={userData}
      />
    );
  }

  getQuestionListView(questionArray, translateLanguageId, categoryId, sortId) {
    const questionList = this.getQuestionList(questionArray, translateLanguageId, categoryId, sortId);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {questionList}
        </ul>
      </div>
    );
  }

  render() {
    const { questionArray, translateLanguageId, categoryId, sortId } = this.props;
    const content = this.getQuestionListView(questionArray, translateLanguageId, categoryId, sortId);

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

// export default injectIntl(QuestionListView)
