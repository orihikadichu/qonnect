import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';

class AnswerList extends Component {
  constructor(props) {
    super(props);
    this.qId = this.props.qId;
  }

  componentWillMount() {
    const question_id = this.props.qId;
    /* const translate_language_id = this.props.translateLanguageId;*/
    this.props.handleFetchData({ question_id });
  }

  onClickCommentForm(formData) {
    const { user } = this.props.state.auth;
    const { answer_id, translate_language_id, content } = formData;
    const postData = {
      user_id: user.id,
      answer_id,
      translate_language_id,
      content,
      question_id: this.qId,
      current_translate_language_id: this.translateLanguageId
    };
    console.log('formData', formData);
    return this.props.handlePostComment(postData);
  }

  getFilteredAnswers(answerArray, translateLanguageId) {
    const filteredAnswers = answerArray.filter((v) => {
      if (v.translate_language_id === translateLanguageId) {
        return true;
      }
      const targetTranslationsNum = v.answer_translations.filter((v) => {
        return (v.translate_language_id === translateLanguageId);
      }).length;
      return (targetTranslationsNum !== 0);
    });
    return filteredAnswers;
  }

  getTranslatedAnswers(answers, translateLanguageId) {
    const translatedAnswers = answers.map((v) => {
      if (v.translate_language_id === translateLanguageId) {
        v.dispText = v.content;
        return v;
      }
      const answerTranslation = v.answer_translations.filter(v => {
        return (v.translate_language_id === translateLanguageId);
      })[0];

      v.dispText = answerTranslation.content;
      return v;
    });
    return translatedAnswers;
  }

  getAnswerList(answerArray, translateLanguageId) {
    const loginUser = this.props.state.auth.user;

    const filteredAnswers = this.getFilteredAnswers(answerArray, translateLanguageId);
    const translatedAnswers = this.getTranslatedAnswers(filteredAnswers, translateLanguageId);

    return translatedAnswers.map(answer => {
      const editLink = answer.user.id === loginUser.id
                     ? <Link to={`/answers/edit/${answer.id}`}>編集</Link>
                     : '';

      return (
        <li key={answer.id} >
          <article className="uk-comment">
            <div className="uk-comment-header uk-comment-body">
              <p style={{"whiteSpace": "pre-wrap"}} >
                <Linkify properties={{ target: '_blank'}} >{answer.dispText}</Linkify>
                <Link to={`/answer_translations/${answer.id}`}><span uk-icon="world"></span></Link>
                { editLink }
              </p>
              <p className="uk-text-meta">{dayjs(answer.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>

            </div>
            <div className="uk-grid uk-grid-small uk-flex-middle" >
              <div className="uk-width-auto">
                <img className="uk-comment-avatar uk-border-circle" src={answer.user.image_path} width="35" height="35" alt="" />
              </div>
              <div className="uk-width-expand">
                <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${answer.user.id}`}>{ answer.user.name }</Link></h4>
              </div>
            </div>
          </article>
          <hr className="uk-divider-small" />
          <div className="uk-margin-bottom" >
            <CommentList list={answer.comments} loginUser={loginUser} translateLanguageId={translateLanguageId} />
          </div>
          <div className="uk-margin-bottom" style={{"paddingLeft": "30px"}} >
            <CommentForm form={`commentForm_${answer.id}`} onSubmit={this.onClickCommentForm.bind(this)} initialValues={{answer_id: answer.id}} />
          </div>
        </li>
      );
    });
  }
  
  render() {
    const { isFetching, answerArray } = this.props.state.answers;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const { translateLanguageId } = this.props;
    const answerList = this.getAnswerList(answerArray, translateLanguageId);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large" >
          { answerList }
        </ul>
      </div>
    );
  }
}

export default AnswerList;
