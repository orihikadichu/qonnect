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

  constructor(props) {
    super(props);
    this.state = {
        voteState:{},//評価の切り替えのための空オブジェクト
    };
  }

  sendVote(questionId){
    const postData = {
      user_id: this.props.user.id,
      question_id: questionId,
      answer_id: null,
      comment_id: null,
      status: 1,
    };
    //votestate===1にして「いいね」をしている状態にする
    const { voteState } = this.state;
    voteState[ questionId ] = 1;
    this.setState({voteState});
    return this.props.handlePostVote(postData);
  }

  deleteVote(questionId) {
    const params = {
      user_id: this.props.user.id,
      key : "question",
      //他のコンテンツと共通化するためvote_idというkeyにする
      vote_id: questionId,
    };
    //votestate===0にして「いいね」を削除した状態にする
    const { voteState } = this.state;
    //ここではanswerId＝ 
    voteState[ questionId ] = "";
    this.setState({voteState});
    return this.props.handleDeleteVote(params);
  }

  getQuestionList(questionArray, translateLanguageId) {
    const contentType = 'question_translations';
    const filteredQuestions = getFilteredContents(questionArray, translateLanguageId, contentType);
    const translatedQuestions = getTranslatedContents(filteredQuestions, translateLanguageId, contentType);

    return translatedQuestions.map(question => {
      const { user } = question;
      const userName = user ? user.name : '不明なユーザー';
      const profileLink = `/users/profile/${user.id}`;
      //評価機能のための変数
      const { voteState } = this.state;
      const votebutton = voteState[question.id] === 1
                   ?<span className="uk-text-danger" uk-icon="heart" onClick={this.deleteVote.bind(this, question.id)}></span>
                   :<span className="uk-text-muted" uk-icon="heart" onClick={this.sendVote.bind(this, question.id)}></span>;

      return (
        <li key={question.id} >
          <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${question.id}`}>{`${question.dispText}`}</Link></p>
          <Link to={`/question_translations/${question.id}`}><span uk-icon="world"></span></Link>
          { votebutton }
          
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

// export default QuestionListView;

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
