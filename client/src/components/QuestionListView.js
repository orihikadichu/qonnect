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
    if(this.props.user.id == null ){
      return;
    }
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
    if(this.props.user.id == null ){
      return;
    }
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

  selectedNationalFlag(countryId){
    switch(countryId){
      case 1:
        return <img src="/image/flag/japan.png" width="25" height="25" alt=""/>;
      case 2:
        return <img className="uk-border" src="/image/flag/america.png" width="25" height="25" alt=""/>;
    }
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

  getQuestionList(questionArray, translateLanguageId, categoryId) {
    const contentType = 'question_translations';
    const filteredQuestions = getFilteredContents(questionArray, translateLanguageId, contentType, categoryId);
    const translatedQuestions = getTranslatedContents(filteredQuestions, translateLanguageId, contentType, categoryId);

    return translatedQuestions.map(question => {
      const { user } = question;
      const userName = user ? user.name : '不明なユーザー';
      const profileLink = `/users/profile/${user.id}`;

      const { votes } = question;
      const myVotes = votes.filter(v => {return v.user_id === this.props.user.id});
      const voteState = myVotes.length !== 0;
      const votebutton = voteState
                   ?<span className="uk-text-danger uk-margin-small-right" uk-icon="star" onClick={this.deleteVote.bind(this, question)}></span>
                   :<span className="uk-text-muted uk-margin-small-right" uk-icon="heart" onClick={this.sendVote.bind(this, question)}></span>;
      const voteNumbers = <span className="uk-text-default">{ votes.length }</span>;
      const nationalFlag = this.selectedNationalFlag(user.country_id);

      const { question_translations } = question;
      let translator;
      translator = "";
      if( question_translations.length !== 0 ){
        const img = question_translations[0].user.image_path;
        const name = question_translations[0].user.name;
        translator = this.TranslateUser(img, name);
      }

      return (
        <li key={question.id} >
          <p className="uk-text-muted">{ question.category.category }</p>
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          <Link to={`/question_translations/${question.id}`}><span uk-icon="world"></span></Link><br/>
          { votebutton }
          { voteNumbers }
          
          <p className="uk-text-meta">{dayjs(question.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              {/* <img className="uk-comment-avatar uk-border-circle" src='/image/blank-profile.png' width="35" height="35" alt="" /> */}
              <Link to={profileLink}><img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" /></Link>
            </div>
            <div>
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={profileLink}>{ userName }</Link></h4>  
            </div>
            <div className="uk-width-expand" >
                { nationalFlag }
            </div>
            <div className="uk-width-expand" >
                { translator }
            </div>
          </div>
        </li>
      )
    });
  }

  getQuestionListView(questionArray, translateLanguageId, categoryId) {
    const questionList = this.getQuestionList(questionArray, translateLanguageId, categoryId);

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {questionList}
        </ul>
      </div>
    );
  }

  render() {
    const { questionArray, translateLanguageId, categoryId } = this.props;
    const content = this.getQuestionListView(questionArray, translateLanguageId, categoryId);

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
  const { categoryId } = state.ctgr;

  return {
    user, 
    categoryId
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
