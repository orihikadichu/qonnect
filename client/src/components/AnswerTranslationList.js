import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';

import { connect } from 'react-redux';
import { postVote, deleteVote } from '../actions/VoteTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostUser from './PostUser';
import PostIcons from './PostIcons';

class AnswerTranslationList extends Component {
  constructor(props) {
    super(props);
    this.aId = this.props.aId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.aId);
  }

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

  getTranslationList(translationList, loginUser) {
    const { formatMessage } = this.props.intl;

    return (
      <ul className="uk-list uk-list-divider uk-list-large" >
        {translationList.map(translation => {

          const votes = translation.vote_translations;
          const myVoteList = votes.filter(v => v.user_id === loginUser.id);  
          const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

          const key = "answer";
          const sendVoteParams = {
              user_id: this.props.user.id,
              question_translation_id: null,
              answer_translation_id: translation.id,
              commcomment_translation_id: null,
              vote_id: translation.id,
              status: 1,
              answerId: translation.answer_id
          };
          const deleteVoteParams = {
              user_id: this.props.user.id,
              key : "answer",
              vote_id: translation.id,
              deleteVoteId: myVoteId,
              answerId: translation.answer_id,
          };
          const sendData = { sendVoteParams,  key };
          const deleteData = { deleteVoteParams,  key };
                  
           return (
             <li key={translation.id} >
               <article className="uk-comment">
                 <div className="uk-comment-header uk-comment-body">
                   <p style={{"whiteSpace": "pre-wrap"}} >
                     <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
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
                        editLink = {`/answer_translations/edit/${translation.id}`}
                        // translateLink = {}
                        onClickSendVote = {this.sendVote.bind(this)}
                        onClickDeleteVote = {this.deleteVote.bind(this)}
                        translate = { false }
                     />

                   </p>
                   <p className="uk-text-meta">{dayjs(translation.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
                 </div>
                 <div>
                   <PostUser user={ translation.user } />
                 </div>
               </article>
             </li>
           );
        })}
      </ul>
    );

  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.answerTranslations;
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AnswerTranslationList));
