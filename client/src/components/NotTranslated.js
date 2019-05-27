import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import dayjs from 'dayjs';

class NotTranslated extends Component {

　componentDidMount() {
    const { questions } = this.props.state.not_translate;
    if (questions.length !== 0) {
      return;
    }
    let params = {};
    this.props.handleFetchData(params);
  }

  constructor(props) {
    super(props);
    //タブの切り替えのための要素
    this.state = {currentTab: 'questions'};
  }

  //各カテゴリの翻訳一覧を表示する関数
  getNotTranslated(contents, url, key) {

    // getNotTranslatedの関数
    return contents.map((v) => {
      const { user } = v;
      const userName = user ? user.name : '不明なユーザー';
      const profileLink = `/users/profile/${user.id}`;
      //コンテンツに対応したidを返す関数
      const id = this.getNotTranslatedId(v, key);

      // ここreturnはmap関数のreturn
      return(
          <li>
            {/* 未翻訳の質問を表示する */}
            <p className="uk-text-lead uk-text-truncate" >
              <Link to={`/questions/${id}`}>{`${v.content}`}</Link>
              <Link to={`${url}${v.id}`}><span uk-icon="world"></span></Link>
            </p>
            {/* 作成時間を表示する */}
            <p className="uk-text-meta">{dayjs(v.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
            {/* プロフィールを表示する */}
            <div className="uk-grid uk-grid-small uk-flex-middle" >
              <div className="uk-width-auto">
                <Link to={profileLink}><img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" /></Link>
              </div>
              <div className="uk-width-expand">
                <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={profileLink}>{ userName }</Link></h4>
                </div>
            </div>
          </li>
      );
    })
  }

  //コンテンツに対応したidを返す関数
  getNotTranslatedId(v, key){
    let id = "";
    switch(key){
      case "questions":
        id = v.id;
        break;
      case "answers":
        id = v.question_id;
        break
      case "comments":
        id = v.answer.question_id;
        break
    }
    return id
  }

  //コンテンツに対応したurlを付加する関数
  getNotTranslatedQuestions(contents) {
    const url = "/question_translations/";
    const key = "questions";
    return this.getNotTranslated(contents, url, key);
  }
  getNotTranslatedAnswers(contents) {
    const url = "/answer_translations/";
    const key = "answers";
    return this.getNotTranslated(contents, url, key);
  }
  getNotTranslatedComments(contents) {
    const url = "/comment_translations/";
    const key = "comments";
    return this.getNotTranslated(contents, url, key);
  }

  getNotTranslatedView(state) {
    
    const {isFetching, questions, answers, comments} = state.not_translate;

    const question_lists = this.getNotTranslatedQuestions(questions);
    const answer_lists = this.getNotTranslatedAnswers(answers);
    const comment_lists = this.getNotTranslatedComments(comments);
    
    //読み込み中であることを示すロゴを表示する
    if (isFetching) {
      return (<ClipLoader />);
    }

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {question_lists}
          {answer_lists}
          {comment_lists}
        </ul>
      </div>
    );
  }

  render() {
    const content = this.getNotTranslatedView(this.props.state);
    return (
      <div>
        <p>未翻訳コンテンツ一覧</p>
        <br></br>
        <div className="uk-margin uk-margin-left uk-margin-right">
          {content}
        </div>
      </div>
    );
  }
}

export default NotTranslated;