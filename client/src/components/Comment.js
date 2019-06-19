import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote, deleteVote } from '../actions/Vote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  selectedNationalFlag(countryId){
    switch(countryId){
      case 1:
        return <img src="/image/common/flag/japan.png" width="25" height="25" alt=""/>;
      case 2:
        return <img className="uk-border" src="/image/common/flag/america.png" width="25" height="25" alt=""/>;
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

  render() {
    const { id, user, content, isOwner, voteList, questions, commentUser, comments, answerId } = this.props;
    const currentQuestionId = questions.currentQuestion.id;
    const editLink = isOwner
                   ? <Link to={`/comments/edit/${id}`}>編集</Link>
                   : '';
    const myVotes = voteList.filter(v => {return v.user_id === user.id});
    const voteState = myVotes.length !== 0;
    const votebutton = voteState
    　　　　　　　　  ?<a onClick={this.deleteVote.bind(this,  id, currentQuestionId)}><FontAwesomeIcon icon="heart" color="red" size="lg"/></a>
    　　　　　　　　  :<a onClick={this.sendVote.bind(this,  id, currentQuestionId)}><FontAwesomeIcon icon="heart" color="gray" size="lg"/></a>;
    const voteNumbers = <span className="uk-text-default">{ voteList.length }</span>;
    const nationalFlag = this.selectedNationalFlag(user.country_id);

    const { commentArray } = comments;
    let translator;
    translator = <h4 className="uk-comment-meta uk-text-right">まだ翻訳されてません</h4>;
    if(typeof commentArray !== 'undefined'){
      const thisAnswerCommentList = commentArray[answerId] ;
      const thisCommentData = thisAnswerCommentList.filter( v => v.id === id) ;
      const commentTranslated = thisCommentData[0].comment_translations;
      if( commentTranslated.length !== 0 ){
        const img = commentTranslated[0].user.image_path;
        const name = commentTranslated[0].user.name;
        translator = this.TranslateUser(img, name);
      }
    }

    return (
      <article className="uk-comment uk-comment-primary">
        <div className="uk-comment-header uk-comment-body">
          <p style={{"whiteSpace": "pre-wrap"}} >
            {content}
            <Link to={`/comment_translations/${id}`}><FontAwesomeIcon icon="globe-americas" color="steelblue" size="lg"/></Link>
          </p>
        </div>
        <div className="uk-grid uk-grid-small uk-flex-middle">
          <div className="uk-width-auto">
            <img className="uk-comment-avatar uk-border-circle" src={commentUser.image_path} width="35" height="35" alt="" />
          </div>
          <div>
            <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${commentUser.id}`}>{ commentUser.name }</Link></h4>
          </div>
          <div className="uk-width-expand" >
                { nationalFlag }
          </div>
          <div className="uk-width-expand" >
                { translator }
          </div>
          { editLink }
          { votebutton }
          { voteNumbers }

        </div>
      </article>
    );
  }
}

//stateの中からauthだけを取り出す。
const mapStateToProps = state => {
  const { questions, comments } = state;
  const { user } = state.auth;
  return {
    user,
    questions,
    comments,
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
