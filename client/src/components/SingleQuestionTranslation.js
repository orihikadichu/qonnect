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
import CommentList from './CommentList';

class SingleQuestionTranslation extends Component {
  constructor(props) {
    super(props);
    this.qId = this.props.qId;
    this.state = {
      buttonState: {},
    };
  }

  componentWillMount() {
    this.props.handleFetchData(this.qId);
  }


  getTranslationList(translationList, loginUser) {

    return translationList.map(translation => {

      const { vote_translations } = translation;
      const myVoteList = vote_translations.filter(v => v.user_id === loginUser.id);  
      const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

      return (
        <li key={translation.id} style={{"listStyle": "none"}} >
          <article className="uk-comment">
            <div className="uk-comment-header uk-comment-body">
              <p className="uk-margin-small-bottom" style={{"whiteSpace": "pre-wrap"}} >
                <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
              </p>
              <p className="uk-text-meta">{dayjs(translation.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
            </div>
          </article>
        </li>
      );})
  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.questionTranslations;
    const loginUser = this.props.state.auth.user;
    const { formatMessage } = this.props.intl;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const currentTranslationContent = this.getTranslationList(currentTranslationList.slice(0, 1), loginUser);
    const translationListContent = currentTranslationContent.length === 0 
                                 ? <h4 className="uk-text-success uk-text-larg ">{formatMessage({id: "messages.empty_translate"})}</h4> 
                                 : currentTranslationContent;

    return (
      <div>
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small uk-margin-top">
          <h5> 
            <span className="uk-text-white uk-background-primary uk-border-rounded" style={{"color":"white","padding":"5px"}}>
              {formatMessage({id: "titles.translation_list"})}
            </span>
          </h5>
          {translationListContent}
        </div>
      </div>
    );
  }
}

//stateの中からauthだけを取り出す。
const mapStateToProps = state => {
  const { user } = state.auth;
  return {
    user,
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
      handleVote: (data) => dispatch(handleVote(data)),
  };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SingleQuestionTranslation));