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
      //翻訳済みコメントのリストを取得するためのAnswer_idリスト
      answerIdList: answerIds,
    };
    return this.props.handlePostComment(postData);
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
        {/*commentFormはコメントを投稿する場所*/}
        <CommentForm form={`commentForm_${answerId}`} onSubmit={this.onClickCommentForm.bind(this)} initialValues={initialValues} />
      </div>
    );
  }

  onClickReply(answerId) {
    //値がtrueかfalseか値を取得
    let { buttonState } = this.state;

    if (buttonState[answerId] && buttonState[answerId] === "open") {
      buttonState[answerId] = "close";
      this.setState({buttonState});
      return
    } else {
      buttonState[answerId] = "open";
      this.setState({buttonState});
      return
    }
  }

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

  getAnswerList(answerArray, translateLanguageId) {
    const { formatMessage } = this.props.intl;
    const loginUser = this.props.state.auth.user;

    const contentType = 'answer_translations';
    const filteredAnswers = getFilteredContents(answerArray, translateLanguageId, contentType);
    const translatedAnswers = getTranslatedContents(filteredAnswers, translateLanguageId, contentType);

    return translatedAnswers.map(answer => {

      const { user } = answer;
      const { votes } = answer;

      const key = "answer";
      const sendVoteParams = {
        user_id: this.props.state.auth.user.id,
        question_id: null,
        answer_id: answer.id,
        comment_id: null,
        status: 1,
        //再レンダリングするためのquestion_id
        questionId: this.props.qId,
      };
      const deleteVoteParams = {
        user_id: this.props.state.auth.user.id,
        key : "answer",
        //他のコンテンツと共通化するためvote_idというkeyにする
        vote_id: answer.id,
        //再レンダリングするためのquestion_id
        questionId: this.props.qId,
      };
      const sendData = { sendVoteParams,  key };
      const deleteData = { deleteVoteParams,  key };

      const commentForm = this.getComment(answer.id);

      const { answer_translations } = answer;

      let translator;
      translator = <h4 className="uk-comment-meta uk-text-right">{formatMessage({id: 'translated.state'})}</h4>;
      if (answer_translations.length !== 0) {
        const { user } = answer_translations[0];
        translator = <Translator user={user} />;
      }

      return (
        <li key={answer.id} >
          <article className="uk-comment">
            <div className="uk-comment-header uk-comment-body">
              <p style={{"whiteSpace": "pre-wrap"}} >
                <Linkify properties={{ target: '_blank'}} >{answer.dispText}</Linkify>
                <br/>
                <br/>
                <PostIcons 
                    //コンテンツのユーザー
                    user = { user } 
                    //ログインユーザー
                    loginUser = { this.props.state.auth.user } 
                    votes = { votes }
                    sendData = { sendData }
                    deleteData = { deleteData }
                    editLink = {`/questions/edit/${answer.id}`}
                    translateLink = {`/question_translations/${answer.id}`}
                    onClickSendVote = {this.sendVote.bind(this)}
                    onClickDeleteVote = {this.deleteVote.bind(this)}
                />

              </p>
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
            {/*CommentListはすでに投稿されたコメントの一覧を表示する*/}
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
