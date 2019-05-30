import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote } from '../actions/Vote';

class Comment extends Component {

  sendVote(commentId){
    const postData = {
      user_id: this.props.user.id,
      question_id: null,
      answer_id: null,
      comment_id: commentId,
      status: 1,
    };
    return this.props.handlePostVote(postData);
  }

  render() {
    const { id, user, content, isOwner } = this.props;
    const editLink = isOwner
                   ? <Link to={`/comments/edit/${id}`}>編集</Link>
                   : '';

    return (
      <article className="uk-comment uk-comment-primary">
        <div className="uk-comment-header uk-comment-body">
          <p style={{"whiteSpace": "pre-wrap"}} >
            {content}
            <Link to={`/comment_translations/${id}`}><span uk-icon="world"></span></Link>
          </p>
        </div>
        <div className="uk-grid uk-grid-small uk-flex-middle" >
          <div className="uk-width-auto">
            <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
          </div>
          <div className="uk-width-expand">
            <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ user.name }</Link></h4>
          </div>
          { editLink }
          {/* 評価機能のボタン */}
          <button className="uk-button uk-button-default" onClick={this.sendVote.bind(this, id)}>
             <span uk-icon="star">Comment</span>
          </button>
        </div>
      </article>
    );
  }
}

//stateの中からauthだけを取り出す。
const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
      //評価機能
      handlePostVote: (data) => dispatch(postVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(Comment);