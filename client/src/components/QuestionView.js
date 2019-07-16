import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import AnswerForm from './AnswerForm';
import AnswerList from '../containers/AnswerList';
import dayjs from 'dayjs';
import { sprintf } from 'sprintf-js';
import { injectIntl } from 'react-intl';
import { isEmptyObject } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Translator from './Translator';
import PostUser from './PostUser';
import PostIcons from './PostIcons';

class QuestionView extends Component {
  constructor(props) {
    super(props);
    const {params} = props.match;
    this.qId = parseInt(params.id, 10);
  }

  componentWillMount() {
    this.props.getQuestionById(this.qId);
  }

  handleSubmit(formData) {
    try {
      const { user } = this.props.state.auth;
      const { content, translate_language_id } = formData;
      const question_id = this.qId;
      const user_id = user.id;
      /* const { translate_language_id } = currentQuestion;*/
      return this.props.handleSubmit({content, question_id, user_id, translate_language_id});
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  getTranslatedQuestion(question, translateLanguageId) {
    if (question.translate_language_id === translateLanguageId) {
      question.dispText = question.content;
      return question;
    }
    const questionTranslation = question.question_translations.filter(question => {
      return (question.translate_language_id === translateLanguageId);
    })[0];

    question.dispText = questionTranslation.content;
    return question;
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

  getAnswerForm(currentQuestion, loginUser) {
    const { formatMessage } = this.props.intl;
    const { intl_key } = currentQuestion.country;
    if (currentQuestion.country_id !== loginUser.country_id) {
      const temp = formatMessage({id: "messages.you_are_not_target"});
      const message = sprintf(temp, formatMessage({id: intl_key}));
      return (
        <div>
          <p className="uk-text-meta">{message}</p>
        </div>
      );
    }

    const answerFormInitVals = { content: '', translate_language_id: '' };
    return (
      <AnswerForm qId={this.qId} initialValues={answerFormInitVals} onSubmit={this.handleSubmit.bind(this)}/>
    );
  }

  getTranslateUser(img) {
    const { formatMessage } = this.props.intl;
    const msg = formatMessage({id: "translated.name"});

    return (
      <div className="uk-text-right">
        <div className="uk-comment-meta uk-display-inline-block" style={{padding: '0 10px'}}>{ msg }</div>
        <div className="uk-display-inline-block">
          <img className="uk-comment-avatar uk-border-circle uk-text-right" src={img} width="35" height="35" alt="" />
        </div>
      </div>
    );
  }

  render() {
    const { currentQuestion } = this.props.state.questions;
    const { translateLanguageId } = this.props.state.intl;
    const { formatMessage } = this.props.intl;

    if (isEmptyObject(currentQuestion)) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    const loginUser = this.props.state.auth.user;
    const question = this.getTranslatedQuestion(currentQuestion, translateLanguageId);
    const { user, votes } = currentQuestion;

    const answerForm = this.getAnswerForm(currentQuestion, loginUser);
    const myVoteList = votes.filter(v => v.user_id === loginUser.id); 
    const myVoteId = myVoteList.length !== 0 ? myVoteList[0].id : 0;

    const voteState = (myVoteList.length === 0);
    const voteParams = (voteState) 
              ? {
                postActionType:"post",
                thisPageKey: "questionView",
                user_id: this.props.state.auth.user.id,
                question_id: currentQuestion.id,
                answer_id: null,
                comment_id: null,
                thisPageContentId: currentQuestion.id,
                status: 1,
              } : {
                postActionType:"delete",
                thisPageKey: "questionView",
                user_id: this.props.state.auth.user.id,
                deleteColumnKey : "question",
                vote_id: currentQuestion.id,
                voteIdForPoint: myVoteId,
                thisPageContentId: currentQuestion.id
              };
    const handleSubmit = this.getOnClickPostVote(voteParams, loginUser.id).bind(this);

    const { question_translations } = question;
    let translator;
    translator = <h4 className="uk-comment-meta uk-text-right">{formatMessage({id: 'translated.state'})}</h4>;
    if (question_translations.length !== 0) {
      const { user } = question_translations[0];
      translator = <Translator user={user} />;
    }

    return (
      <main className="uk-container uk-container-small">
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
          <p className="uk-text-muted">{ question.category.category }</p>
          <p>
            <Linkify properties={{ target: '_blank'}} >{question.dispText}</Linkify>
            <br/>
            <br/>
            <PostIcons
              user = { user }
              loginUser = { loginUser }
              votes = { votes }
              voteState = { voteState }
              editLink = {`/questions/edit/${this.qId}`}
              translateLink = {`/question_translations/${this.qId}`}
              onClickHandleVote = { handleSubmit }
              translate = { true }
            />
          </p>
          <p className="uk-text-meta">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div>
              <PostUser user={user} />
            </div>
            <div className="uk-width-expand" >
                { translator }
            </div>
          </div>
        </div>

        <h3 className="uk-heading-line"><span>{formatMessage({id: "titles.answer_list"})}</span></h3>

        <div className="uk-margin-bottom">
          { answerForm }
        </div>
          <AnswerList qId={this.qId} translateLanguageId={translateLanguageId} />
        <hr className="uk-divider-icon" />

        <Link to="/">Top</Link>
      </main>
    );
  }
}

export default injectIntl(QuestionView);
