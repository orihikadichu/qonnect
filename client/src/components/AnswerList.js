import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { getFilteredContents, getTranslatedContents } from '../utils/Translations';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sprintf } from 'sprintf-js';
import Translator from './Translator';
import PostUser from './PostUser';
import PostIcons from './PostIcons';

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.qId = this.props.qId;
    //ここからはコメント機能を実装するところ
    this.state = {
      buttonState: {},//空のオブジェクト
      voteState: {},//評価のための
    };
  }

  componentWillMount() {
    const question_id = this.props.qId;
    /* const translate_language_id = this.props.translateLanguageId;*/
    this.props.handleFetchData({ question_id });
  }

  onClickCommentForm(formData) {
    const { user } = this.props.state.auth;
    const { answer_id, translate_language_id, content } = formData;
    const answerIds = this.props.state.answers.answerArray.map((v) =>{ return v.id })
    const postData = {
      user_id: user.id,
      answer_id,
      translate_language_id,
      content,
      question_id: this.qId,
      current_translate_language_id: this.translateLanguageId,
      answerIdList: answerIds,
    };
    return this.props.handlePostComment(postData);
  }

  getTranslator(answer_translations, formatMessage) {

    const defaultElem = (
      <h4 className="uk-comment-meta uk-text-right">
        { formatMessage({id: "translated.state" })}
      </h4>
    );

    if (answer_translations.length === 0) {
      return defaultElem;
    }

    const { user } = answer_translations[0];
    return <Translator user={user} />;
  }

  getComment(answerId) {

    const { buttonState } = this.state;

    if (buttonState[answerId] !== "open") {
      return "";
    }

    const initialValues = {
      answer_id: answerId,
      content: "",
      translate_language_id: "",
    };
    return (
      <div className="uk-margin-bottom" style={{"paddingLeft": "30px"}} >
        <CommentForm form={`commentForm_${answerId}`} onSubmit={this.onClickCommentForm.bind(this)} initialValues={initialValues} />
      </div>
    );
  }

  onClickReply(answerId) {
    let { buttonState } = this.state;
    const isOpened = ( buttonState[answerId] && buttonState[answerId] === "open" );
    buttonState[answerId] = isOpened ? "close" : "open" ;
    return this.setState({buttonState});
  }

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

  getAnswerList(answerArray, translateLanguageId) {
    const { formatMessage } = this.props.intl;
    const loginUser = this.props.state.auth.user;

    const contentType = 'answer_translations';
    const translatedAnswers = getTranslatedContents(answerArray, translateLanguageId, contentType);

    return translatedAnswers.map(answer => {

      const { user, votes } = answer;

      const myVoteList = votes.filter(v => v.user_id === loginUser.id);  
      const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

      const voteState = (myVoteList.length === 0);
      const voteParams = (voteState) 
                      ? {
                        postActionType:"post",
                        thisPageKey: "answer",
                        user_id: this.props.state.auth.user.id,
                        voted_user_id: user.id,
                        question_id: null,
                        answer_id: answer.id,
                        comment_id: null,
                        status: 1,
                        thisPageContentId: this.props.qId,
                      }:{
                        postActionType:"delete",
                        thisPageKey: "answer",
                        user_id: this.props.state.auth.user.id,
                        voted_user_id: user.id,
                        deleteColumnKey : "answer",
                        vote_id: answer.id,
                        voteIdForPoint: myVoteId,
                        thisPageContentId: this.props.qId,
                      };
        const handleSubmit = this.getOnClickPostVote(voteParams, loginUser.id).bind(this);
        const commentForm = this.getComment(answer.id);
        const { answer_translations } = answer;

        const translator = this.getTranslator(answer_translations, formatMessage);

        return (
          <li key={answer.id} >
            <article className="uk-comment">
              <div className="uk-comment-header uk-comment-body">
                <p className="uk-margin-small-bottom" style={{"whiteSpace": "pre-wrap"}} >
                  <Linkify properties={{ target: '_blank'}} >{answer.dispText}</Linkify>
                </p>
                <PostIcons 
                      user = { user } 
                      loginUser = { this.props.state.auth.user } 
                      votes = { votes }
                      voteState={voteState}
                      editLink = {`/answers/edit/${answer.id}`}
                      translateLink = {`/answer_translations/${answer.id}`}
                      onClickHandleVote = { handleSubmit }
                      translate = { true }
                  />
                <p className="uk-text-meta">{dayjs(answer.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>

              </div>
              <div className="uk-grid uk-grid-small uk-flex-middle" >
                <div>
                  <PostUser user={ answer.user } />
                </div>
                <div className="uk-width-expand" >
                  { translator }
                </div>
              </div>
            </article>
            <hr className="uk-divider-small" />
            <div className="uk-margin-bottom" >
              <CommentList list={answer.comments} loginUser={loginUser} translateLanguageId={translateLanguageId} />
              <div className="uk-text-right uk-margin-top">
                <p onClick={this.onClickReply.bind(this,answer.id)}><FontAwesomeIcon icon={['far','comment-dots']} color="black" size="2x"/></p>
              </div>
            </div>
            {commentForm}
          </li>
        );
    });
  }

  render() {
    const { isFetching, answerArray } = this.props.state.answers;
    const { formatMessage } = this.props.intl;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const { translateLanguageId } = this.props;
    const answerList = this.getAnswerList(answerArray, translateLanguageId);

    if (answerList.length === 0) {
      return (
        <div>
          <h4 className="uk-text-success">{formatMessage({id: "messages.empty_answers"})}</h4>
        </div>
      );
    }

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large" >
          { answerList }
        </ul>
      </div>
    );
  }
}

export default injectIntl(AnswerList);
