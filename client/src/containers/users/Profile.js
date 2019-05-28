import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/User';
import QuestionListView from '../../components/QuestionListView';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.state = {currentTab: 'questions'};
    this.userId = parseInt(params.id, 10);
    this.props.fetchUserProfile(this.userId);

  }

  onClickTab(newTabKey, e) {
    e.preventDefault();
    e.stopPropagation();
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
           const active = this.state['currentTab'] === v.key
                        ? 'uk-active'
                        : '';
           return (
             <li className={active} onClick={this.onClickTab.bind(this, v.key)} key={v.key} >
               <a href="">{v.name}</a>
             </li>
           );
        })}
      </ul>
    );
  }

  getAnswerList(answers) {
    return (
      <ul className="uk-list uk-list-divider uk-list-large">
      {answers.map(answer => {
        const { user } = answer;
        const userName = user ? user.name : '不明なユーザー';
        return (
          <li key={answer.id} >
            <p className="uk-text-lead uk-text-truncate" ><Link to={`/answer/${answer.id}`}>{`${answer.content}`}</Link></p>
            <p className="uk-text-meta">{dayjs(answer.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
            <div className="uk-grid uk-grid-small uk-flex-middle" >
              <div className="uk-width-auto">
                <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
              </div>
              <div className="uk-width-expand">
                <h4 className="uk-comment-meta uk-margin-remove">{ userName }</h4>
              </div>
            </div>
          </li>
        );
      })}
      </ul>
    );
  }

  getCommentList(comments) {
    return (
      <ul className="uk-list uk-list-divider uk-list-large">
        {comments.map(comment => {
           const { user } = comment;
           const userName = user ? user.name : '不明なユーザー';
           return (
             <li key={comment.id} >
               <p className="uk-text-lead uk-text-truncate" ><Link to={`/comment/${comment.id}`}>{`${comment.content}`}</Link></p>
               <p className="uk-text-meta">{dayjs(comment.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
               <div className="uk-grid uk-grid-small uk-flex-middle" >
                 <div className="uk-width-auto">
                   <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
                 </div>
                 <div className="uk-width-expand">
                   <h4 className="uk-comment-meta uk-margin-remove">{ userName }</h4>
                 </div>
               </div>
             </li>
           );
        })}
      </ul>
    );
  }


  getCurrentUserPostList(profileState, currentTab) {
    const { questions, answers, comments } = profileState;
    if (currentTab === 'questions') {
      return (<QuestionListView questionArray={questions} translateLanguageId={1} />);
    } else if (currentTab === 'answers') {
      return this.getAnswerList(answers);
    } else if (currentTab === 'comments') {
      return this.getCommentList(comments);
    }
  }

  render() {
    // とりあえずログインユーザーのプロフィールページを。
    // propsで渡されたuserIdのプロフィールページを表示するようにする。
    const { profile } = this.props.state;
    const { user } = profile;

    console.log("user",user);

    if (Object.keys(user).length === 0) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    const tabList = this.getTabList();
    const userPostList = this.getCurrentUserPostList(profile, this.state.currentTab);

    return (
      <main className="uk-container uk-container-small">
        <p><img src={user.image_path} className="uk-border-circle" alt="" width="100" height="100" /></p>
        <p className="uk-text-lead">{user.name}</p>
        <p style={{"whiteSpace": "pre-wrap"}}>{user.profile}</p>
        <p>出身地</p>
        <p>{user.country.name}</p>
        <h3 className="uk-heading-line"><span>投稿一覧</span></h3>
        {tabList}
        {userPostList}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: (userId) => dispatch(getUserProfile(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
