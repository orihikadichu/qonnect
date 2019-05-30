import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import AnswerForm from './AnswerForm';
import AnswerList from '../containers/AnswerList';
import dayjs from 'dayjs';

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

  sendVote(questionId){
    const postData = {
      user_id: 1,
      question_id: questionId,
      answer_id: null,
      comment_id: null,
      status: 1,
    };
    return this.props.handlePostVote(postData);
  }

  render() {
    const { currentQuestion, translateLanguageId } = this.props.state.questions;

    if (Object.keys(currentQuestion).length === 0) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    const loginUser = this.props.state.auth.user;

    const question = this.getTranslatedQuestion(currentQuestion, translateLanguageId);

    const { user } = currentQuestion;
    const answerFormInitVals = { content: '', translate_language_id: '' };
    const editLink = user.id === loginUser.id
                   ? <p><Link to={`/questions/edit/${this.qId}`}>編集</Link></p>
                   : '';

    return (
      <main className="uk-container uk-container-small">
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
          <p>
            <Linkify properties={{ target: '_blank'}} >{question.dispText}</Linkify>
            <Link to={`/question_translations/${this.qId}`}><span uk-icon="world"></span></Link>
          </p>
          <p className="uk-text-meta">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
            </div>
            <div className="uk-width-expand">
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ user.name }</Link></h4>
            </div>
          </div>
          { editLink }
          {/* 評価機能のボタン */}
          <span className="uk-text-primary" uk-icon="heart" onClick={this.sendVote.bind(this, question.id)}></span>
        </div>

        <h3 className="uk-heading-line"><span>回答一覧</span></h3>

        <div className="uk-margin-bottom">
          <AnswerForm qId={this.qId} initialValues={answerFormInitVals} onSubmit={this.handleSubmit.bind(this)}/>
        </div>
          <AnswerList qId={this.qId} translateLanguageId={translateLanguageId} />
        <hr className="uk-divider-icon" />

        <Link to="/">Top</Link>
      </main>
    );
  }
}

export default QuestionView;
