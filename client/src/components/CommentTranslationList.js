import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote, deleteVote } from '../actions/VoteTranslation';

class CommentTranslationList extends Component {
  constructor(props) {
    super(props);
    this.commentId = this.props.commentId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.commentId);
  }

  sendVote(comment){
    const params = {
      user_id: this.props.user.id,
      question_translation_id: null,
      answer_translation_id: null,
      comment_translation_id: comment.id,
      status: 1,
      //再レンダリング用のId
      commentId: comment.comment_id
    };
    const key = "comment";
    const data = { params,  key };
    return this.props.handlePostVote(data);
  }

  deleteVote(comment) {
    const params = {
      user_id: this.props.user.id,
      key : "comment",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: comment.id,
      //再レンダリング用のId
      commentId: comment.comment_id,
    };
    const key = "comment";
    const data = { params,  key };
    return this.props.handleDeleteVote(data);
  }

  getTranslationList(translationList, loginUser) {
    const { formatMessage } = this.props.intl;

    return (
      <ul className="uk-list uk-list-divider uk-list-large" >
        {translationList.map(translation => {
           const editLink = translation.user.id === loginUser.id
                          ? <Link to={`/comment_translations/edit/${translation.id}`}>{formatMessage({id: "links.edit"})}</Link>
                          : '';
          
           const myVotes = translation.vote_translations.filter(v => {return v.user_id === loginUser.id});
           const voteState = myVotes.length !== 0;
           const votebutton = voteState
                          ? <span className="uk-text-danger" uk-icon="star" onClick={this.deleteVote.bind(this,translation)}></span>
                          : <span className="uk-text-muted" uk-icon="heart" onClick={this.sendVote.bind(this,translation)}></span>;

           return (
             <li key={translation.id} >
               <article className="uk-comment">
                 <div className="uk-comment-header uk-comment-body">
                   <p style={{"whiteSpace": "pre-wrap"}} >
                     <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
                     { editLink }
                     { votebutton }
                   </p>
                   <p className="uk-text-meta">{dayjs(translation.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
                 </div>
                 <div className="uk-grid uk-grid-small uk-flex-middle" >
                   <div className="uk-width-auto">
                     <img className="uk-comment-avatar uk-border-circle" src={translation.user.image_path} width="35" height="35" alt="" />
                   </div>
                   <div className="uk-width-expand">
                     <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${translation.user.id}`}>{ translation.user.name }</Link></h4>
                   </div>
                 </div>
               </article>
             </li>
           );
        })}
      </ul>
    );
  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.commentTranslations;
    const loginUser = this.props.state.auth.user;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const content = this.getTranslationList(currentTranslationList, loginUser);

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
  return {
    user
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CommentTranslationList));
