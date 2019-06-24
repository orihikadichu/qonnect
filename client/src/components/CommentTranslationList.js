import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';

import { connect } from 'react-redux';
import { postVote, deleteVote } from '../actions/VoteTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostUser from './PostUser';

class CommentTranslationList extends Component {
  constructor(props) {
    super(props);
    this.commentId = this.props.commentId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.commentId);
  }

  sendVote(comment){
    if( this.props.user.id == null){
      return;
    }
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
    if( this.props.user.id == null){
      return;
    }
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
                          ? <Link className="uk-margin-small-right" to={`/comment_translations/edit/${translation.id}`}><FontAwesomeIcon icon="edit" color="steelblue" size="lg"/></Link>
                          : '';
          
           const myVotes = translation.vote_translations.filter(v => {return v.user_id === loginUser.id});
           const voteState = myVotes.length !== 0;
           const votebutton = voteState
                          ?<a onClick={this.deleteVote.bind(this, translation)}><FontAwesomeIcon icon="heart" color="red" size="lg"/></a>
                          :<a onClick={this.sendVote.bind(this,  translation)}><FontAwesomeIcon icon={['far','heart']} color="gray" size="lg"/></a>;
           const voteNumbers = <span className="uk-margin-small-right uk-text-default">{ translation.vote_translations.length }</span>;

           return (
             <li key={translation.id} >
               <article className="uk-comment">
                 <div className="uk-comment-header uk-comment-body">
                   <p style={{"whiteSpace": "pre-wrap"}} >
                     <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
                     <br/>
                     <br/>
                     { votebutton }
                     { voteNumbers }
                     { editLink }
                   </p>
                   <p className="uk-text-meta">{dayjs(translation.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
                 </div>
                 <div className="uk-grid uk-grid-small uk-flex-middle" >
                   <div>
                     <PostUser user={ translation.user } />
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
