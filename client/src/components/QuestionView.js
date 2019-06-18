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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class QuestionView extends Component {
  constructor(props) {
    super(props);
    //props.matchはURLクエリーで:idが
    //props.matchの中にあるparamsというkeyのvalueを取得している。
    const {params} = props.match;
    //idを１０進法の数値に変換する
    this.qId = parseInt(params.id, 10);
  }

  componentWillMount() {
    this.props.getQuestionById(this.qId);
  }

  handleSubmit(formData) {
    try {
      //authの中にあるuserキーに対応するvalueを取り出す。という意味
      const { user } = this.props.state.auth;
      //formDataの中のcontent,translate_langugase_idを取り出す
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
      //「DBに保存されている言語id」と「画面に表示されている言語」が一致している要素だけを取得する。[0]とすることで最初にフィルタリングされたものを取り出す。
      return (question.translate_language_id === translateLanguageId);
    })[0];

    //questionの中に新たなdispTextというプロパティを生成する
    question.dispText = questionTranslation.content;
    return question;
  }

  sendVote(question){
    if (this.props.state.auth.user.id == null) {
      return;
    }
    const params = {
      user_id: this.props.state.auth.user.id,
      question_id: question.id,
      answer_id: null,
      comment_id: null,
      status: 1,
    };
    const key = "questionView";
    const data = { params,  key };
    return this.props.handlePostVote(data);
  }

  deleteVote(question) {
    if (this.props.state.auth.user.id == null) {
      return;
    }
    const params = {
      user_id: this.props.state.auth.user.id,
      key : "question",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: question.id,
    };
    const key = "questionView";
    const data = { params,  key };
    return this.props.handleDeleteVote(data);
  }

  getAnswerForm(currentQuestion, loginUser) {
    const { formatMessage } = this.props.intl;
    if (currentQuestion.country_id !== loginUser.country_id) {
      const temp = formatMessage({id: "messages.you_are_not_target"})
      const mesasge = sprintf(temp, currentQuestion.country.name);
      return (
        <div>
          <p className="uk-text-meta">{mesasge}</p>
        </div>

      );
    }

    const answerFormInitVals = { content: '', translate_language_id: '' };
    return (
      <AnswerForm qId={this.qId} initialValues={answerFormInitVals} onSubmit={this.handleSubmit.bind(this)}/>
    );
  }

  selectedNationalFlag(countryId){
    let src;
    switch(countryId){
      case 1:
        src = "japan";
        break;
      case 2:
        src = "america";
        break;
    }
    return <img className="uk-box-shadow-medium" src={`/image/flag/${src}.png`} style={{border: "1px solid #dcdcdc"}} width="25" height="25" alt=""/>;
  }

  TranslateUser(img, name){
    return (
      <div>
        <div className="uk-text-right">
          <img className="uk-comment-avatar uk-border-circle uk-text-right" src={img} width="35" height="35" alt="" />
        </div>
        <div>
          <h4 className="uk-comment-meta uk-margin-remove uk-text-right">{ name }さんが翻訳済</h4>
        </div>
      </div>
    )
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

    const editLink = user.id === loginUser.id
                   ? <p><Link to={`/questions/edit/${this.qId}`}>{formatMessage({id: 'links.edit'})}</Link></p>
                   : '';

    const myVotes = votes.filter(v => {return v.user_id === loginUser.id});
    const voteState = myVotes.length !== 0;
    const votebutton = voteState
                  　?<a onClick={this.deleteVote.bind(this, currentQuestion)}><FontAwesomeIcon icon="heart" color="red" size="lg"/></a>
                  　:<a onClick={this.sendVote.bind(this, currentQuestion)}><FontAwesomeIcon icon="heart" color="gray" size="lg"/></a>;
    const voteNumbers = <span className="uk-text-default">{ votes.length }</span>;
    const nationalFlag = this.selectedNationalFlag(user.country_id);

    const { question_translations } = question;
    let translator;
    translator = <h4 className="uk-comment-meta uk-text-right">まだ翻訳されてません</h4>;
    if( question_translations.length !== 0 ){
      const img = question_translations[0].user.image_path;
      const name = question_translations[0].user.name;
      translator = this.TranslateUser(img, name);
    }

    return (
      <main className="uk-container uk-container-small">
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
          <p className="uk-text-muted">{ question.category.category }</p>
          <p>
            <Linkify properties={{ target: '_blank'}} >{question.dispText}</Linkify>
            <Link to={`/question_translations/${this.qId}`}><FontAwesomeIcon icon="globe-americas" color="steelblue" size="lg"/></Link>
          </p>
          <p className="uk-text-meta">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
            </div>
            <div>
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ user.name }</Link></h4>
            </div>
            <div className="uk-width-expand" >
                { nationalFlag }
            </div>
            <div className="uk-width-expand" >
                { translator }
            </div>
          </div>
          { editLink }
          { votebutton }
          { voteNumbers }

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
