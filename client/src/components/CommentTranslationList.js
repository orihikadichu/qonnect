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
import PostIcons from './PostIcons';

class CommentTranslationList extends Component {
  constructor(props) {
    super(props);
    this.commentId = this.props.commentId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.commentId);
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

  getTranslationList(translationList, loginUser) {
    const { formatMessage } = this.props.intl;

    return (
      <ul className="uk-list uk-list-divider uk-list-large" >
        {translationList.map(translation => {
            const key = "comment";
            const sendVoteParams = {
                user_id: this.props.user.id,
                question_translation_id: null,
                answer_translation_id: null,
                comment_translation_id: translation.id,
                status: 1,
                //再レンダリング用のId
                commentId: translation.comment_id
            };
            const deleteVoteParams = {
                user_id: this.props.user.id,
                key : "comment",
                //他のコンテンツと共通化するためvote_idというkeyにする
                vote_id: translation.id,
                //再レンダリング用のId
                commentId: translation.comment_id,
            };
            const sendData = { sendVoteParams,  key };
            const deleteData = { deleteVoteParams,  key };

           return (
             <li key={translation.id} >
               <article className="uk-comment">
                 <div className="uk-comment-header uk-comment-body">
                   <p style={{"whiteSpace": "pre-wrap"}} >
                     <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>z
                     <br/>
                     <br/>
                     <PostIcons 
                        //コンテンツのユーザー
                        user = { translation.user } 
                        //ログインユーザー
                        loginUser = { loginUser  } 
                        votes = { translation.vote_translations }
                        sendData = { sendData }
                        deleteData = { deleteData }
                        editLink = {`/comment_translations/edit/${translation.id}`}
                        // translateLink = {}
                        onClickSendVote = {this.sendVote.bind(this)}
                        onClickDeleteVote = {this.deleteVote.bind(this)}
                        translate = { false }
                     />
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
