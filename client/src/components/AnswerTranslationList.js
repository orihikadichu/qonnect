import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';

import { connect } from 'react-redux';
import { postVote, deleteVote, handleVote } from '../actions/VoteTranslation';
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

  getTranslationList(translationList, loginUser) {
    const { formatMessage } = this.props.intl;

    return (
      <ul className="uk-list uk-list-divider uk-list-large" >
        {translationList.map(translation => {

          const votes = translation.vote_translations;
          const myVoteList = votes.filter(v => v.user_id === loginUser.id);  
          const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

          const voteState = (myVoteList.length === 0);
          const voteParams = (voteState) 
                      ? {
                        postActionType:"post",
                        thisPageKey: "answer",
                        user_id: this.props.user.id,
                        question_translation_id: null,
                        answer_translation_id:  translation.id,
                        comment_translation_id: null,
                        vote_id: translation.id,
                        status: 1,
                        thisPageContentId: translation.answer_id
                      } : {
                        postActionType:"delete",
                        thisPageKey: "answer",
                        user_id: this.props.user.id,
                        deleteColumnKey : "answer",
                        vote_id: translation.id,
                        voteIdForPoint: myVoteId,
                        thisPageContentId: translation.answer_id
                      };
          const handleSubmit = this.getOnClickPostVote(voteParams, loginUser.id).bind(this);
                  
           return (
             <li key={translation.id} >
               <article className="uk-comment">
                 <div className="uk-comment-header uk-comment-body">
                   <p style={{"whiteSpace": "pre-wrap"}} >
                     <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
                     <br/>
                     <br/>
                     <PostIcons 
                        user = { translation.user } 
                        loginUser = { loginUser  } 
                        votes = { translation.vote_translations }
                        voteState = { voteState }
                        editLink = {`/answer_translations/edit/${translation.id}`}
                        onClickHandleVote = { handleSubmit }
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
      handleVote: (data) => dispatch(handleVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AnswerTranslationList));
