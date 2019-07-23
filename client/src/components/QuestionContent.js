import React, { Component } from 'react';
import { handleVote } from '../actions/Vote';
import PostAnswerCount from './PostAnswerCount';
import PostUser from './PostUser';
import PostIcons from './PostIcons';
import Translator from './Translator';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

class QuestionContent extends Component {

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

  getTranslator(question_translations, formatMessage) {
    const defaultElem = (
      <h4 className="uk-comment-meta uk-text-right">
        { formatMessage({id: "translated.state" })}
      </h4>
    );

    if (question_translations.length === 0) {
      return defaultElem;
    }

    const { user } = question_translations[0];
    return <Translator user={user} />;
  }

  render() {

    const { question, formatMessage, userData } = this.props;

    const { user } = question;
    const { answers } = question;
    const { votes } = question;
    
    const myVoteList = votes.filter(v => v.user_id === userData.id);
    const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

    const voteState = (myVoteList.length === 0);
    const voteParams = (voteState)
                     ? {
                        postActionType: "post",
                        thisPageKey: "questionList",
                        user_id: userData.id,
                        voted_user_id: user.id,
                        question_id: question.id,
                        answer_id: null,
                        comment_id: null,
                        status: 1,
                     } : {
                        postActionType: "delete",
                        thisPageKey: "questionList",
                        user_id: userData.id,
                        voted_user_id: user.id,
                        deleteColumnKey: "question",
                        vote_id: question.id,
                        voteIdForPoint: myVoteId,
                     };
  
    const  contentCount = answers.length !==0
                        ? <PostAnswerCount reply={ answers } />
                        : "";

    const handleSubmit = this.getOnClickPostVote(voteParams, userData.id).bind(this);

    const { question_translations } = question;
    const translator = this.getTranslator(question_translations, formatMessage);

    return (
      <li key={question.id} >
        <p>
          <span className="uk-text-muted">{ formatMessage({id: question.category.intl_key })}</span>
          {/* <span className="uk-text-meta uk-margin-small-left">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</span> */}
        </p>
        <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
        <div className="button-area uk-margin-bottom" >
        <PostIcons
            user = { user }
            loginUser = { userData  }
            votes = { votes }
            voteState = { voteState }
            onClickHandleVote = { handleSubmit }
            editLink = {`/questions/edit/${question.id}`}
            translateLink = {`/question_translations/${question.id}`}
            translate = { true }
        />
        </div>
        <div className="uk-grid uk-grid-small uk-flex-middle" >
          <div>
            <PostUser user={user} />
          </div>
          <div>
            { contentCount }
          </div>
          <div className="uk-width-expand" >
            { translator }
          </div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = state => {
  return {
    state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleVote: (data) => dispatch(handleVote(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContent);