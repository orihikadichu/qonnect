import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions/User';
import QuestionListView from '../../components/QuestionListView';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { isEmptyObject } from '../../utils';
import { injectIntl } from 'react-intl';

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

  getVoteList(vote_translations){
    // const userId = vote_translations.map((e)=>{return e.user_id})
    return vote_translations.map((e)=>{
      return (
          <Link to={e.user.profile_link}>
            <img className="uk-comment-avatar uk-border-circle" src={e.user.image_path} width="35" height="35" alt="" />
          </Link>
      )
    });
  };

  getTabList() {
    const { formatMessage } = this.props.intl;
    const tabData = [
      {
        name: formatMessage({id: "links.question"}),
        key: 'questions'
      },
      {
        name: formatMessage({id: "links.answer"}),
        key: 'answers'
      },
      {
        name: formatMessage({id: "links.comment"}),
        key: 'comments'
      },
      {
        name: formatMessage({id: "links.translate"}),
        key: 'translates'
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
            <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${answer.question_id}`}>{`${answer.content}`}</Link></p>
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
           const { user, answer } = comment;
           const userName = user ? user.name : '不明なユーザー';
           return (
             <li key={comment.id} >
               <p className="uk-text-lead uk-text-truncate" ><Link to={`/questions/${answer.question_id}`}>{`${comment.content}`}</Link></p>
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

  getTranslatedList(translates) {
    return (
      <ul className="uk-list uk-list-divider uk-list-large">
        {translates.map(translate => {
           const link = translate.translation_link;
           return (
             <li key={`translate_${translate.key}`} >
               <p className="uk-text-lead uk-text-truncate" ><Link to={link}>{`${translate.content}`}</Link></p>
               <p className="uk-text-meta">{dayjs(translate.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
             </li>
           );
        })}
      </ul>
    );
  }

  filterTranslatedContent(translate) {
    const translatedContentArray = [];
    for (const [key, value] of Object.entries(translate)){
      value.forEach((e)=>{
        e["key"]=key+e.id;
        translatedContentArray.push(e);
      });
  　};
    return translatedContentArray;
  }

  getCurrentTabContents(tabState, currentTab) {
    const { questions, answers, comments, translates } = tabState;
    const { id } = this.props.state.auth.user
    if (currentTab === 'questions') {
      return (<QuestionListView questionArray={questions} translateLanguageId={id} />);
    } else if (currentTab === 'answers') {
      return this.getAnswerList(answers);
    } else if (currentTab === 'comments') {
      return this.getCommentList(comments);
    } else if (currentTab === 'translates') {
      const translateArray = this.filterTranslatedContent(translates);
      return this.getTranslatedList(translateArray);
    }
  }

  render() {
    // とりあえずログインユーザーのプロフィールページを。
    // propsで渡されたuserIdのプロフィールページを表示するようにする。
    const { profile } = this.props.state;
    const { user } = profile;
    const { formatMessage } = this.props.intl;
    const { vote_translations } = user;

    if (isEmptyObject(user)) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    const tabList = this.getTabList();
    const userPostList = this.getCurrentTabContents(profile, this.state.currentTab);
    const voteList = this.getVoteList(vote_translations);
  
    return (
      <main className="uk-container uk-container-small">
        <div className="uk-grid uk-grid-small uk-flex-middle uk-margin-bottom">
          <div className="uk-width-auto uk-flex-first">
            <img src={user.image_path} className="uk-border-circle" alt="" width="120" height="" />
          </div>
          <div className="uk-width-expand" >
            <p className="uk-text-lead">{user.name}</p>
            <p>{formatMessage({id: "messages.birthplace"})}: {user.country.name}</p>
          </div>
        </div>
        <div class="uk-overflow-auto">
          <p>いいねした人</p>
          {voteList}
        </div>
        <div>
          <p style={{"whiteSpace": "pre-wrap"}}>{user.profile}</p>
        </div>
        <h3 className="uk-heading-line"><span>{formatMessage({id: "titles.post_list"})}</span></h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Profile));
