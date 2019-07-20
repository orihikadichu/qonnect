import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { injectIntl } from 'react-intl';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
import { postVote, deleteVote, handleVote } from '../actions/VoteTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostUser from './PostUser';
import PostIcons from './PostIcons';

class QuestionTranslationList extends Component {
  constructor(props) {
    super(props);
    this.qId = this.props.qId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.qId);
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

    return translationList.map(translation => {

      const { vote_translations } = translation;
      const myVoteList = vote_translations.filter(v => v.user_id === loginUser.id);  
      const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

      const voteState = (myVoteList.length === 0);
      const voteParams = (voteState) 
                       ? {
                          postActionType:"post",
                          thisPageKey: "question",
                          user_id: this.props.user.id,
                          question_translation_id: translation.id,
                          answer_translation_id:  null,
                          comment_translation_id: null,
                          vote_id: translation.id,
                          status: 1,
                          thisPageContentId: translation.question_id,
                       } : {
                          postActionType:"delete",
                          thisPageKey: "question",
                          user_id: this.props.user.id,
                          deleteColumnKey : "question",
                          vote_id: translation.id,
                          voteIdForPoint: myVoteId,
                          thisPageContentId: translation.question_id,
                       };
      const handleSubmit = this.getOnClickPostVote(voteParams, loginUser.id).bind(this);

      return (
        <li key={translation.id} >
          <article className="uk-comment">
            <div className="uk-comment-header uk-comment-body">
              <p className="uk-margin-small-bottom" style={{"whiteSpace": "pre-wrap"}} >
                <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
              </p>
              <PostIcons 
                    user = { translation.user } 
                    loginUser = { loginUser  } 
                    votes = { translation.vote_translations }
                    voteState = { voteState }
                    editLink = {`/question_translations/edit/${translation.id}`}
                    onClickHandleVote = { handleSubmit }
                    translate = { false }
                />
              <p className="uk-text-meta">{dayjs(translation.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>

            </div>
            <div className="uk-grid uk-grid-small uk-flex-middle" >
              <div>
                <PostUser user={ translation.user } />
              </div>
            </div>
          </article>
        </li>
      );})

  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.questionTranslations;
    const loginUser = this.props.state.auth.user;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const translationList = this.getTranslationList(currentTranslationList, loginUser);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large" >
          {translationList}
        </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionTranslationList));
