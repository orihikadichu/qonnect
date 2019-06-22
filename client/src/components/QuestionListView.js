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

class QuestionListView extends Component {

  sendVote(question){
    if(this.props.user.id == null ){
      return;
    }
    const params = {
      user_id: this.props.user.id,
      question_id: question.id,
      answer_id: null,
      comment_id: null,
      status: 1,
      country_id: question.country_id,
    };
    const key = "questionList";
    const data = { params,  key };
    return this.props.handlePostVote(data);
  }

  deleteVote(question) {
    if(this.props.user.id == null ){
      return;
    }
    const params = {
      user_id: this.props.user.id,
      key : "question",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: question.id,
      country_id: question.country_id,
    };
    const key = "questionList";
    const data = { params,  key };
    return this.props.handleDeleteVote(data);
  }

  selectedNationalFlag(countryId){
    let src;
    switch(countryId) {
      case 1:
        src = "japan";
        break;
      case 2:
        src = "america";
        break;
      default :
        src = "japan";
        break;
    }
    return <img className="" src={`/image/common/flag/${src}.png`} style={{border: "1px solid #dcdcdc"}} width="25" height="25" alt=""/>;
  }

  getQuestionList(questionArray, translateLanguageId, categoryId) {
    const contentType = 'question_translations';
    const filteredQuestions = getFilteredContents(questionArray, translateLanguageId, contentType, categoryId);
    const translatedQuestions = getTranslatedContents(filteredQuestions, translateLanguageId, contentType, categoryId);

    return translatedQuestions.map(question => {
      const { user } = question;
      const userName = user ? user.name : '不明なユーザー';
      const profileLink = `/users/profile/${user.id}`;
      const { formatMessage } = this.props.intl

      const { votes } = question;
      const myVotes = votes.filter(v => {return v.user_id === this.props.user.id});
      const voteState = myVotes.length !== 0;
      const votebutton = voteState
                       ? <a onClick={this.deleteVote.bind(this, question)}><FontAwesomeIcon icon="heart" color="red" size="lg"/></a>
                       : <a onClick={this.sendVote.bind(this, question)}><FontAwesomeIcon icon={['far','heart']} color="gray" size="lg"/></a>;

      const voteNumbers = <span className="uk-text-default">{ votes.length }</span>;
      const nationalFlag = this.selectedNationalFlag(user.country_id);

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
          {/* <p className="uk-text-muted">{ question.category.category }</p> */}
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          <div className="button-area uk-margin-small-bottom" >
            <span>
              { votebutton }
              { voteNumbers }
            </span>
            <Link to={`/question_translations/${question.id}`} className="uk-margin-small-left" >
              <FontAwesomeIcon icon="globe-americas" color="steelblue" size="lg"/>
            </Link>
          </div>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              {/* <img className="uk-comment-avatar uk-border-circle" src='/image/blank-profile.png' width="35" height="35" alt="" /> */}
              <Link to={profileLink}><img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" /></Link>
            </div>
            <div>
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={profileLink}>{ userName }</Link></h4>
            </div>
            <div className="uk-width-auto" >
              { nationalFlag }
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

//stateの中からauthだけを取り出す。
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
