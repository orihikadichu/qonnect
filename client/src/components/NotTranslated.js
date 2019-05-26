import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class NotTranslated extends Component {

　componentDidMount() {
    const { questions } = this.props.state.not_translate;
    // const { country_id } = this.props.state.auth.user;
    if (questions.length !== 0) {
      return;
    }
    // const translate_language_id = translateLanguageId;
    let params = {};
    // if (country_id) {
    //   params.country_id = country_id;
    // }
    this.props.handleFetchData(params);
  }

  getNotTranslatedView(state) {
    
    const {isFetching, questions, answers, comments} = state.not_translate;
    console.log("answers",answers);
    console.log("comments",comments);
    
    //読み込み中であることを示す。
    if (isFetching) {
      return (<ClipLoader />);
    }

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {/* 未翻訳一覧を表示する */}
          {questions.map((v) => {
            const { user } = v;
            const userName = user ? user.name : '不明なユーザー';
            const profileLink = `/users/profile/${user.id}`;
            return(
                <li>
                  {/* 未翻訳の質問を表示する */}
                  <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${v}.id}`}>{`${v.content}`}</Link></p>
                  {/* 作成時間を表示する */}
                  <p className="uk-text-meta">{dayjs(v.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
                  {/* 自分の名前や画像を表示する */}
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
          })}
          {/* 未翻訳の回答一覧を表示する */}
          {answers.map((v) => {
            const { user } = v;
            const userName = user ? user.name : '不明なユーザー';
            const profileLink = `/users/profile/${user.id}`;
            return(
                <li>
                  {/* 未翻訳の質問を表示する */}
                  <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${v}.id}`}>{`${v.content}`}</Link></p>
                  {/* 作成時間を表示する */}
                  <p className="uk-text-meta">{dayjs(v.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
                  {/* 自分の名前や画像を表示する */}
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
          })}
          {/* 未翻訳のコメント一覧を表示する */}
          {comments.map((v) => {
            const { user } = v;
            const userName = user ? user.name : '不明なユーザー';
            const profileLink = `/users/profile/${user.id}`;
            return(
                <li>
                  {/* 未翻訳の質問を表示する */}
                  <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${v}.id}`}>{`${v.content}`}</Link></p>
                  {/* 作成時間を表示する */}
                  <p className="uk-text-meta">{dayjs(v.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
                  {/* 自分の名前や画像を表示する */}
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
          })}
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
