import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote, deleteVote } from '../actions/Vote';

class Comment extends Component {

  sendVote(commentId, currentQuestionId){
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
    const { id, user, content, isOwner, voteState, questions } = this.props;
    const currentQuestionId = questions.currentQuestion.id;
    const editLink = isOwner
                   ? <Link to={`/comments/edit/${id}`}>編集</Link>
                   : '';
    const votebutton = voteState
                   ? <span className="uk-text-danger" uk-icon="star" onClick={this.deleteVote.bind(this, id, currentQuestionId)}></span>
                   : <span className="uk-text-muted" uk-icon="heart" onClick={this.sendVote.bind(this, id, currentQuestionId)}></span>;

    return (
      <article className="uk-comment uk-comment-primary">
        <div className="uk-comment-header uk-comment-body">
          <p style={{"whiteSpace": "pre-wrap"}} >
            {content}
            <Link to={`/comment_translations/${id}`}><span uk-icon="world"></span></Link>
          </p>
        </div>
        <div className="uk-grid uk-grid-small uk-flex-middle">
          <div className="uk-width-auto">
            <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
          </div>
          <div className="uk-width-expand">
            <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ user.name }</Link></h4>
          </div>
          { editLink }
          { votebutton }
        </div>
      </article>
    );
  }
}

//stateの中からauthだけを取り出す。
const mapStateToProps = state => {
  const { questions } = state;
  const { user } = state.auth;
  return {
    user,
    questions
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
export default connect(mapStateToProps, mapDispatchToProps)(Comment);