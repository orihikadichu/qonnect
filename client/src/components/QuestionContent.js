import React, { Component } from 'react';
import { handleVote } from '../actions/Vote';
import PostAnswerCount from './PostAnswerCount';
import PostUser from './PostUser';
import PostIcons from './PostIcons';
import Translator from './Translator';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import ReactHover from 'react-hover';
import HoverComponent from './HoverComponent';
import TriggerComponent from './TriggerComponent';

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

  ja2Bit( str ) {
    return ( str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/) )? true : false ;
  }

  getHoverComponent(question){
    const { formatMessage } = this.props;
    
    if(question.question_translations.length===0){
      return "";
    }
    const originalText = question.content;
    // const translationText = question_translations.slice(0,1).pop().content;
    const innerElement = (
      <div>
        <h5> 
          <span className="uk-text-white uk-background-primary uk-border-rounded" style={{"color":"white","padding":"5px"}}>
            {formatMessage({id: "titles.original"})}
          </span>
        </h5>
        <p className="uk-margin-small-bottom">
          {originalText}
        </p>
      </div>
    );

    return(
      <ReactHover.Hover type='hover'>
        <HoverComponent innerElement={innerElement} />
      </ReactHover.Hover> 
    );
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

    const options = {
      followCursor:true,
      shiftX: 20,
      shiftY: 0
    }

    const hoverComponent = this.getHoverComponent(question);

    return (
      <li key={question.id} >
        <p>
          <span className="uk-text-muted">{ formatMessage({id: question.category.intl_key })}</span>
        </p>

        <ReactHover options={options}>
          <ReactHover.Trigger type='trigger'>
            <TriggerComponent questionId={question.id} questionDispText={question.dispText} />
          </ReactHover.Trigger>
          {hoverComponent}
        </ReactHover>

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