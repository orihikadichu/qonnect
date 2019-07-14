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

    return translationList.map(translation => {

      const { vote_translations } = translation;
      const myVoteList = vote_translations.filter(v => v.user_id === loginUser.id);  
      const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

      const key = "question";
      const sendVoteParams = {
          user_id: this.props.user.id,
          question_translation_id: translation.id,
          answer_translation_id: null,
          commcomment_translation_id: null,
          vote_id: translation.id,
          status: 1,
          questionId: translation.question_id,
      };
      const deleteVoteParams = {
          user_id: this.props.user.id,
          key : "question",
          vote_id: translation.id,
          deleteVoteId: myVoteId,
          questionId: translation.question_id,
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
                    editLink = {`/question_translations/edit/${translation.id}`}
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
      //評価機能
      handlePostVote: (data) => dispatch(postVote(data)),
      handleDeleteVote: (data) => dispatch(deleteVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionTranslationList));
