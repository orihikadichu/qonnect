import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class QuestionList extends Component {

  componentDidMount() {
    const { questionArray, translateLanguageId } = this.props.state.questions;

    const { country_id } = this.props.state.auth.user;
    if (questionArray.length !== 0) {
      return;
    }
    const translate_language_id = translateLanguageId;
    let params = {};
    if (country_id) {
      params.country_id = country_id;
    }
    this.props.handleFetchData(params);

  }

  getFilteredQuestions(questionArray, translateLanguageId) {
    const filteredQuestions = questionArray.filter((v) => {
      if (v.translate_language_id === translateLanguageId) {
        return true;
      }
      const targetTranslationsNum = v.question_translations.filter((v) => {
        return (v.translate_language_id === translateLanguageId);
      }).length;
      return (targetTranslationsNum !== 0);
    });
    return filteredQuestions;
  }

  getTranslatedQuestions(questions, translateLanguageId) {
    const translatedQuestions = questions.map((v) => {
      if (v.translate_language_id === translateLanguageId) {
        v.dispText = v.content;
        return v;
      }
      const questionTranslation = v.question_translations.filter(v => {
        return (v.translate_language_id === translateLanguageId);
      })[0];

      v.dispText = questionTranslation.content;
      return v;
    });
    return translatedQuestions;
  }

  getQuestionList(questionArray, translateLanguageId) {

    const filteredQuestions = this.getFilteredQuestions(questionArray, translateLanguageId);
    const translatedQuestions = this.getTranslatedQuestions(filteredQuestions, translateLanguageId);
    

    return translatedQuestions.map(question => {
      const { user } = question;
      const userName = user ? user.name : '不明なユーザー';
      const profileLink = `/users/profile/${user.id}`;
      return (
        <li key={question.id} >
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          <p className="uk-text-meta">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              {/* <img className="uk-comment-avatar uk-border-circle" src='/image/blank-profile.png' width="35" height="35" alt="" /> */}
              <Link to={profileLink}><img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" /></Link>
            </div>
            <div className="uk-width-expand">
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={profileLink}>{ userName }</Link></h4>
            </div>
          </div>
        </li>
      )
    });
  }

  getQuestionListView(state) {
    
    const { isFetching, questionArray, translateLanguageId } = state.questions;
    if (isFetching) {
      return (<ClipLoader />);
    }

    const questionList = this.getQuestionList(questionArray, translateLanguageId);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {questionList}
        </ul>
      </div>
    );
  }

  render() {
    console.log("render直後のthis.props.state",this.props.state);
    const content = this.getQuestionListView(this.props.state);

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default QuestionList;
