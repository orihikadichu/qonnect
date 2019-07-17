import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
import { postVote, deleteVote, handleVote} from '../actions/Vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sprintf } from 'sprintf-js';
import { injectIntl } from 'react-intl';
import Translator from './Translator';
import PostUser from './PostUser';
import PostIcons from './PostIcons';
import { isEmptyObject } from '../utils';

class Comment extends Component {

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

  render() {
    const { id, content, isOwner, voteList, commentUser, answerId, comments, user, questions, intl } = this.props;
    const currentQuestionId = questions.currentQuestion.id;
    const { formatMessage } = intl;
    const { currentCommentList } = comments;

    const myVoteList = voteList.filter(v => v.user_id === this.props.user.id); 
    const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;
    const commentUserId = myVoteList.length !== 0 ? myVoteList[0].user_id : 0;

    const voteState = (myVoteList.length === 0);
    const voteParams = (voteState) 
              ? {
                postActionType:"post",
                thisPageKey: "comment",
                user_id: this.props.user.id,
                question_id: null,
                answer_id: null,
                comment_id: id,
                status: 1,
                thisPageContentId: currentQuestionId,
              } : {
                postActionType:"delete",
                thisPageKey: "comment",
                user_id: this.props.user.id,
                deleteColumnKey : "comment",
                vote_id: id,
                voteIdForPoint: myVoteId,
                thisPageContentId: currentQuestionId,
              };

    const handleSubmit = this.getOnClickPostVote(voteParams, this.props.user.id).bind(this);
    
    let translator;
    translator = <h4 className="uk-comment-meta uk-text-right">{formatMessage({id: 'translated.state'})}</h4>;

    if (currentCommentList.length !== 0) {
      const thisAnswerCommentList = currentCommentList[answerId];
      console.log("currentCommentList", currentCommentList);
      console.log("answerId", answerId);
      console.log("thisAnswerCommentList", thisAnswerCommentList);
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
          <p className="uk-margin-small-bottom" style={{"whiteSpace": "pre-wrap"}} >
            {content}
          </p>
          <PostIcons 
                user = { commentUserId } 
                loginUser = { this.props.user } 
                votes = { voteList }
                voteState = { voteState }
                editLink = {`/comments/edit/${id}`}
                translateLink = {`/comment_translations/${id}`}
                onClickHandleVote = { handleSubmit }
                translate = { true }
          />
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
    // handlePostVote: (data, questionId) => dispatch(postVote(data, questionId)),
    // handleDeleteVote: (data) => dispatch(deleteVote(data)),
    handleVote: (data) => dispatch(handleVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Comment))
