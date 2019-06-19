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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class QuestionTranslationList extends Component {
  constructor(props) {
    super(props);
    this.qId = this.props.qId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.qId);
  }

  sendVote(question){
    if( this.props.user.id == null){
      return;
    }
    const params = {
      user_id: this.props.user.id,
      question_translation_id: question.id,
      answer_translation_id: null,
      commcomment_translation_id: null,
      status: 1,
      //再レンダリング用のId
      questionId: question.question_id,
    };
    const key = "question";
    const data = { params,  key };
    return this.props.handlePostVote(data);
  }

  deleteVote(question) {
    if( this.props.user.id == null){
      return;
    }
    const params = {
      user_id: this.props.user.id,
      key : "question",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: question.id,
      //再レンダリング用のId
      questionId: question.question_id,
    };
    const key = "question";
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

  getTranslationList(translationList, loginUser) {
    const { formatMessage } = this.props.intl;

    return translationList.map(translation => {
      const editLink = translation.user.id === loginUser.id
                     ? <Link to={`/question_translations/edit/${translation.id}`}>{formatMessage({id: "links.edit"})}</Link>
                     : '';

      const myVotes = translation.vote_translations.filter(v => {return v.user_id === loginUser.id});
      const voteState = myVotes.length !== 0;
      const votebutton = voteState
                     ?<a onClick={this.deleteVote.bind(this, translation)}><FontAwesomeIcon icon="heart" color="red" size="lg"/></a>
                     :<a onClick={this.sendVote.bind(this,  translation)}><FontAwesomeIcon icon="heart" color="gray" size="lg"/></a>;
      const voteNumbers = <span className="uk-text-default">{ translation.vote_translations.length }</span>;
      const nationalFlag = this.selectedNationalFlag(translation.user.country_id);

      return (
        <li key={translation.id} >
          <article className="uk-comment">
            <div className="uk-comment-header uk-comment-body">
              <p style={{"whiteSpace": "pre-wrap"}} >
                <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify><br/>
                { editLink }
                { votebutton }
                { voteNumbers }
              </p>
              <p className="uk-text-meta">{dayjs(translation.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>

            </div>
            <div className="uk-grid uk-grid-small uk-flex-middle" >
              <div className="uk-width-auto">
                <img className="uk-comment-avatar uk-border-circle" src={translation.user.image_path} width="35" height="35" alt="" />
              </div>
              <div>
                <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${translation.user.id}`}>{ translation.user.name }</Link></h4>
              </div>
              <div className="uk-width-expand" >
                { nationalFlag }
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
