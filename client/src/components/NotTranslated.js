import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class NotTranslated extends Component {

  constructor(props) {
    super(props);
    //タブの切り替えのための要素
    this.state = {currentTab: 'questions'};
  }

  componentDidMount() {
    const { questions } = this.props.state.not_translate;
    if (questions.length !== 0) {
      return;
    }
    let params = {};
    this.props.handleFetchData(params);
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
      return (
        //ここでcontentの種類+そのコンテンツのidの組み合わせをkeyとすることでこのHTML要素が一意になるようにする
        <li key={`${key}_${v.id}`} >
        {/* <li> */}
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
  getNotTranslatedId(v, key) {
    switch(key) {
      case "questions":
        return v.id;
      case "answers":
        return v.question_id;
      case "comments":
        return v.answer.question_id;
    }
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
    console.log('contents', contents);
    return this.getNotTranslated(contents, url, key);
  }

  //現在のユーザーリスト
  getCurrentTabContents(tabState, currentTab) {
    //tabState = state.not_translate の中に3つの連想配列が入っている
    const { questions, answers, comments } = tabState;
    if (currentTab === 'questions') {
      return this.getNotTranslatedQuestions(questions);
    } else if (currentTab === 'answers') {
      return  this.getNotTranslatedAnswers(answers);
    } else if (currentTab === 'comments') {
      return this.getNotTranslatedComments(comments);
    }
  }

  onClickTab(newTabKey, e) {
    e.preventDefault();
    e.stopPropagation();
    //stateの状態変更
    this.setState({
      currentTab: newTabKey
    });
  }

  getTabList() {
    const tabData = [
      {
        name: '質問',
        key: 'questions'
      },
      {
        name: '回答',
        key: 'answers'
      },
      {
        name: 'コメント',
        key: 'comments'
      }
    ];

    return (
      <ul className="uk-tab" >
      {tabData.map(v => {
        //currentTabとkeyが一致したとき、それをactiveにする
        const active = this.state['currentTab'] === v.key
                     ? 'uk-active'
                     : '';
        return (
          <li key={v.key} className={active} onClick={this.onClickTab.bind(this, v.key)} >
            <a href="">{v.name}</a>
          </li>
        );
      })}
      </ul>
    );
  }

  getNotTranslatedView(state) {

    const { isFetching } = state.not_translate;

    //読み込み中であることを示すロゴを表示する
    if (isFetching) {
      return (<ClipLoader />);
    }

    const tabContents = this.getCurrentTabContents(state.not_translate, this.state.currentTab);

    return (
      <ul className="uk-list uk-list-divider uk-list-large" >
        {tabContents}
      </ul>
    );
  }

  render() {
    const content = this.getNotTranslatedView(this.props.state);
    const tabList = this.getTabList();
    
    return (
      <div>
      <div className="uk-container uk-container-small">
      <p>未翻訳コンテンツ一覧</p>
      <br></br>
      </div>
      <div className="uk-container uk-container-small">
      {tabList}
      {content}
          </div>
          </div>
    );
  }
}

export default NotTranslated;
