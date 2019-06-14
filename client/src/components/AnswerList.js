import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { getFilteredContents, getTranslatedContents } from '../utils/Translations';
import { injectIntl } from 'react-intl';

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.qId = this.props.qId;
        //ここからはコメント機能を実装するところ
    this.state = {
        buttonState:{},//空のオブジェクト
        voteState:{},//評価のための
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
    const postData = {
      user_id: user.id,
      answer_id,
      translate_language_id,
      content,
      question_id: this.qId,
      current_translate_language_id: this.translateLanguageId
    };
    console.log('formData', formData);
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

  sendVote(answerId, currentQuestionId){
    if(this.props.state.auth.user.id == null ){
      return;
    }
    const params = {
      user_id: this.props.state.auth.user.id,
      question_id: null,
      answer_id: answerId,
      comment_id: null,
      status: 1,
       //再レンダリングするためのquestion_id
       questionId: currentQuestionId,
    };
    const key = "answer";
    const data = { params, key };
    return this.props.handlePostVote(data);
  }

  deleteVote(answerId, currentQuestionId) {
    if(this.props.state.auth.user.id == null ){
      return;
    }
    const params = {
      user_id: this.props.state.auth.user.id,
      key : "answer",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: answerId,
      //再レンダリングするためのquestion_id
      questionId: currentQuestionId,
    };
    const key = "answer";
    const data = { params, key };
    return this.props.handleDeleteVote(data);
  }

  selectedNationalFlag(countryId){
    switch(countryId){
      case 1:
        return <img src="/image/flag/japan.png" width="25" height="25" alt=""/>;
      case 2:
        return <img className="uk-border" src="/image/flag/america.png" width="25" height="25" alt=""/>;
    }
  }
  
  TranslateUser(img, name){
    return (
      <div>
        <div className="uk-text-right">
          <img className="uk-comment-avatar uk-border-circle uk-text-right" src={img} width="35" height="35" alt="" />
        </div>
        <div>
          <h4 className="uk-comment-meta uk-margin-remove uk-text-right">{ name }さんが翻訳済</h4>
        </div>
      </div>
    )
  }

  getAnswerList(answerArray, translateLanguageId) {
    const { formatMessage } = this.props.intl;
    const loginUser = this.props.state.auth.user;

    const contentType = 'answer_translations';
    const filteredAnswers = getFilteredContents(answerArray, translateLanguageId, contentType);
    const translatedAnswers = getTranslatedContents(filteredAnswers, translateLanguageId, contentType);

    return translatedAnswers.map(answer => {
      const editLink = answer.user.id === loginUser.id
                     ? <Link to={`/answers/edit/${answer.id}`}>{ formatMessage({id: "links.edit"}) }</Link>
                     : '';

      const myVotes = answer.votes.filter(v => {return v.user_id === loginUser.id});
      const voteState = myVotes.length !== 0;
      const votebutton = voteState
                    ? <span className="uk-text-danger uk-margin-small-right" uk-icon="star" onClick={this.deleteVote.bind(this, answer.id, this.props.qId)}></span>
                    : <span className="uk-text-muted uk-margin-small-right" uk-icon="heart" onClick={this.sendVote.bind(this, answer.id, this.props.qId)}></span>;
      const voteNumbers = <span className="uk-text-default">{ answer.votes.length }</span>;
      const commentForm = this.getComment(answer.id);
      const nationalFlag = this.selectedNationalFlag(answer.user.country_id);

      const { answer_translations } = answer;

      let translator;
      translator = "";
      if( answer_translations.length !== 0 ){
        const img = answer_translations[0].user.image_path;
        const name = answer_translations[0].user.name;
        translator = this.TranslateUser(img, name);
      }

      return (
        <li key={answer.id} >
          <article className="uk-comment">
            <div className="uk-comment-header uk-comment-body">
              <p style={{"whiteSpace": "pre-wrap"}} >
                <Linkify properties={{ target: '_blank'}} >{answer.dispText}</Linkify>
                <Link to={`/answer_translations/${answer.id}`}><span uk-icon="world"></span></Link><br/>
                { editLink }
                { votebutton }
                { voteNumbers }
              </p>
              <p className="uk-text-meta">{dayjs(answer.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>

            </div>
            <div className="uk-grid uk-grid-small uk-flex-middle" >
              <div className="uk-width-auto">
                <img className="uk-comment-avatar uk-border-circle" src={answer.user.image_path} width="35" height="35" alt="" />
              </div>
              <div>
                <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${answer.user.id}`}>{ answer.user.name }</Link></h4>
              </div>
              <div className="uk-width-expand" >
                { nationalFlag }
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
              <p uk-icon="icon: commenting; ratio: 2" onClick={this.onClickReply.bind(this,answer.id)}></p>
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
