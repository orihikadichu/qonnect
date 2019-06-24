import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote, deleteVote } from '../actions/Vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sprintf } from 'sprintf-js';
import { injectIntl } from 'react-intl';
import Translator from './Translator';
import PostUser from './PostUser';

class Comment extends Component {

  sendVote(commentId, currentQuestionId){
    if(this.props.user.id == null ){
      return;
    }
    const params = {
      user_id: this.props.user.id,
      question_id: null,
      answer_id: null,
      comment_id: commentId,
      status: 1,
      //再レンダリングするためのquestion_id
      questionId: currentQuestionId,
    };
    const key = "comment";
    const data = { params, key };
    return this.props.handlePostVote(data);
  }

  deleteVote(commentId, currentQuestionId) {
    if(this.props.user.id == null ){
      return;
    }
    const params = {
      user_id: this.props.user.id,
      key : "comment",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: commentId,
      //再レンダリングするためのquestion_id
      questionId: currentQuestionId,
    };
    const key = "comment";
    const data = { params,  key };
    return this.props.handleDeleteVote(data);
  }

  render() {
    const { id, user, content, isOwner, voteList, questions, commentUser, comments, answerId, intl} = this.props;
    const currentQuestionId = questions.currentQuestion.id;
    const editLink = isOwner
                   ? <Link to={`/comments/edit/${id}`}><FontAwesomeIcon className="uk-margin-small-right" icon="edit" color="steelblue" size="lg"/></Link>
                   : '';   
    const myVotes = voteList.filter(v => {return v.user_id === user.id});
    const voteState = myVotes.length !== 0;
    const votebutton = voteState
                     ? <a onClick={this.deleteVote.bind(this, id, currentQuestionId)}><FontAwesomeIcon icon="heart" color="red" size="lg"/></a>
                     : <a onClick={this.sendVote.bind(this, id, currentQuestionId)}><FontAwesomeIcon icon={['far','heart']} color="gray" size="lg"/></a>;
    const voteNumbers = <span className="uk-margin-small-right uk-text-default">{ voteList.length }</span>;
    const { formatMessage } = intl;
    const { commentArray } = comments;

    let translator;
    translator = <h4 className="uk-comment-meta uk-text-right">{formatMessage({id: 'translated.state'})}</h4>;
    if(typeof commentArray !== 'undefined'){
      const thisAnswerCommentList = commentArray[answerId] ;
      const thisCommentData = thisAnswerCommentList.filter(v => v.id === id);
      const commentTranslated = thisCommentData[0].comment_translations;
      if (commentTranslated.length !== 0) {
        const { user } = commentTranslated[0];
        translator = <Translator user={user} />;
      }
    }

    return (
      <article className="uk-comment uk-comment-primary">
        <div className="uk-comment-header uk-comment-body">
          <p style={{"whiteSpace": "pre-wrap"}} >
            {content}
            <br/>
            <br/>
            { votebutton }
            { voteNumbers }
            <Link className="uk-margin-small-right" to={`/comment_translations/${id}`}><FontAwesomeIcon icon="globe-americas" color="steelblue" size="lg"/></Link>
            { editLink }
          </p>
        </div>
        <div className="uk-grid uk-grid-small uk-flex-middle">
          <div>
            <PostUser user={ commentUser } />
          </div>
          <div className="uk-width-expand" >
            { translator }
          </div>
        </div>
      </article>
    );
  }
}

//stateの中からauthだけを取り出す。
const mapStateToProps = state => {
  const { questions, comments } = state;
  const { user } = state.auth;
  const { intl } = state;
  return {
    user,
    questions,
    comments,
    intl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //評価機能
    handlePostVote: (data, questionId) => dispatch(postVote(data, questionId)),
    handleDeleteVote: (data) => dispatch(deleteVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Comment))
