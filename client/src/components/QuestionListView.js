import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { getFilteredContents, getTranslatedContents } from '../utils/Translations';

//componentの中でdispatchするための設定
import { connect } from 'react-redux';
//評価するための関数
import { postVote, deleteVote } from '../actions/Vote';

class QuestionListView extends Component {

  sendVote(question){
    const params = {
      user_id: this.props.user.id,
      question_id: question.id,
      answer_id: null,
      comment_id: null,
      status: 1,
      country_id: question.country_id,
    };
    const key = "questionList";
    const data = { params,  key };
    return this.props.handlePostVote(data);
  }

  deleteVote(question) {
    const params = {
      user_id: this.props.user.id,
      key : "question",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: question.id,
      country_id: question.country_id,
    };
    const key = "questionList";
    const data = { params,  key };
    return this.props.handleDeleteVote(data);
  }

  getQuestionList(questionArray, translateLanguageId) {
    const contentType = 'question_translations';
    const filteredQuestions = getFilteredContents(questionArray, translateLanguageId, contentType);
    const translatedQuestions = getTranslatedContents(filteredQuestions, translateLanguageId, contentType);

    return translatedQuestions.map(question => {
      const { user } = question;
      const userName = user ? user.name : '不明なユーザー';
      const profileLink = `/users/profile/${user.id}`;

      const { votes } = question;
      const myVotes = votes.filter(v => {return v.user_id === this.props.user.id});
      const voteState = myVotes.length !== 0;
      const votebutton = voteState
                   ?<span className="uk-text-danger" uk-icon="star" onClick={this.deleteVote.bind(this, question)}></span>
                   :<span className="uk-text-muted" uk-icon="heart" onClick={this.sendVote.bind(this, question)}></span>;
      const voteNumbers = <p className="uk-text-default">{ votes.length }</p>;

      return (
        <li key={question.id} >
          <p className="uk-text-muted">{ question.category.category }</p>
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          <Link to={`/question_translations/${question.id}`}><span uk-icon="world"></span></Link>
          { votebutton }
          { voteNumbers }
          
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

  getQuestionListView(questionArray, translateLanguageId) {
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

    const { questionArray, translateLanguageId } = this.props;
    const content = this.getQuestionListView(questionArray, translateLanguageId);

    return (
      <div>
        {content}
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionListView);
