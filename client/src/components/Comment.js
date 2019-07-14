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
import PostIcons from './PostIcons';

class Comment extends Component {

  sendVote(data, user_id) {
    if (user_id == null) {
        return;
    }
    const ACTION_TYPE_VOTE = 6;
    data.sendVoteParams.action_type_id = ACTION_TYPE_VOTE;
    return this.props.handlePostVote(data);
  }

  deleteVote(data, user_id) {
      if (user_id == null) {
          return;
      }
      const ACTION_TYPE_VOTE = 6;
      data.deleteVoteParams.action_type_id = ACTION_TYPE_VOTE;
      return this.props.handleDeleteVote(data);
  }

  render() {
    const { id, content, isOwner, voteList, commentUser, answerId, comments, user, questions, intl } = this.props;
    const currentQuestionId = questions.currentQuestion.id;
    const { formatMessage } = intl;
    const { currentCommentList } = comments;

    const myVoteList = voteList.filter(v => v.user_id === user.id); 
    const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

    const key = "comment";
    const sendVoteParams = {
      user_id: this.props.user.id,
      question_id: null,
      answer_id: null,
      comment_id: id,
      status: 1,
      questionId: currentQuestionId,
    };
    const deleteVoteParams = {
      user_id: this.props.user.id,
      key : "comment",
      vote_id: id,
      deleteVoteId: myVoteId,
      questionId: currentQuestionId,
    };
    const sendData = { sendVoteParams,  key };
    const deleteData = { deleteVoteParams,  key };

    let translator;

    translator = <h4 className="uk-comment-meta uk-text-right">{formatMessage({id: 'translated.state'})}</h4>;

    if (currentCommentList.length !== 0) {
      const thisAnswerCommentList = currentCommentList[answerId];
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
            <PostIcons 
                //コンテンツのユーザー
                user = { user } 
                //ログインユーザー
                loginUser = { this.props.user } 
                votes = { voteList }
                sendData = { sendData }
                deleteData = { deleteData }
                editLink = {`/comments/edit/${id}`}
                translateLink = {`/comment_translations/${id}`}
                onClickSendVote = {this.sendVote.bind(this)}
                onClickDeleteVote = {this.deleteVote.bind(this)}
                translate = { true }
            />

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

const mapStateToProps = state => {
  const { questions, comments, intl } = state;
  const { user } = state.auth;
  return {
    user,
    questions,
    comments,
    intl,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handlePostVote: (data, questionId) => dispatch(postVote(data, questionId)),
    handleDeleteVote: (data) => dispatch(deleteVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Comment))
