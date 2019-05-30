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
        //ここからはコメント機能を実装するところ
    this.state = {
        buttonState:{},//空のオブジェクト
    };
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

  getComment(answerId) {

    const { buttonState } = this.state;

    if (buttonState[answerId] !== "open") {
      return "";
    }

    const initialValues = {
      answer_id: answerId,
      content: "",
      translate_language_id: "",
    };

    return (
      <div className="uk-margin-bottom" style={{"paddingLeft": "30px"}} >
          {/*commentFormはコメントを投稿する場所*/}
          <CommentForm form={`commentForm_${answerId}`} onSubmit={this.onClickCommentForm.bind(this)} initialValues={initialValues} />
      </div>
    );
  }

  onClickReply(answerId) {
    //値がtrueかfalseか値を取得
    let { buttonState } = this.state;

    if (buttonState[answerId] && buttonState[answerId] == "open") {
      // this.state.buttonState= "close";
      buttonState[answerId] = "close";
      this.setState({buttonState});
      return
    } else {
      buttonState[answerId] = "open";
      this.setState({buttonState});
      return
    }
  }

  sendVote(answerId){
    const postData = {
      user_id: this.props.state.auth.user.id,
      question_id: null,
      answer_id: answerId,
      comment_id: null,
      status: 1,
    };
    return this.props.handlePostVote(postData);
  }

  getAnswerList(answerArray, translateLanguageId) {
    const loginUser = this.props.state.auth.user;

    const filteredAnswers = this.getFilteredAnswers(answerArray, translateLanguageId);
    const translatedAnswers = this.getTranslatedAnswers(filteredAnswers, translateLanguageId);

    return translatedAnswers.map(answer => {
      const editLink = answer.user.id === loginUser.id
                     ? <Link to={`/answers/edit/${answer.id}`}>編集</Link>
                     : '';

      const commentForm = this.getComment(answer.id);

      return (
        <li key={answer.id} >
          <article className="uk-comment">
            <div className="uk-comment-header uk-comment-body">
              <p style={{"whiteSpace": "pre-wrap"}} >
                <Linkify properties={{ target: '_blank'}} >{answer.dispText}</Linkify>
                <Link to={`/answer_translations/${answer.id}`}><span uk-icon="world"></span></Link>
                { editLink }
                {/* 評価ボタン */}
                <span className="uk-text-primary" uk-icon="heart" onClick={this.sendVote.bind(this, answer.id)}></span>
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
            {/*CommentListはすでに投稿されたコメントの一覧を表示する*/}
            <CommentList list={answer.comments} loginUser={loginUser} translateLanguageId={translateLanguageId} />
            <button className="uk-button uk-button-default" onClick={this.onClickReply.bind(this,answer.id)}>
                返信する
            </button>
          </div>

          {commentForm}

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

    if (answerList.length === 0) {
      return (
        <div>
          <h4 className="uk-text-success">まだ回答がありません。最初の投稿者になりましょう！</h4>
        </div>
      );
    }

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
