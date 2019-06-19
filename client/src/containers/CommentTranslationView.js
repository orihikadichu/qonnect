import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import CommentTranslationForm from '../components/CommentTranslationForm';
import CommentTranslationList from '../containers/CommentTranslationList';
import {
  fetchSingleComment,
} from '../actions/Comment';
import {
  postCommentTranslationData
} from '../actions/CommentTranslation';
import { isEmptyObject } from '../utils';
import { injectIntl } from 'react-intl';


class CommentTranslationView extends Component {
  constructor(props) {
    super(props);
    const {params} = props.match;
    this.commentId = parseInt(params.comment_id, 10);
  }

  componentWillMount() {
    this.props.getCommentById(this.commentId);
  }

  handleSubmit(formData) {
    try {
      const { content, translate_language_id } = formData;
      if (content === '') {
        const msg = '空文字で投稿はできません。';
        throw new Error(msg);
      }
      const { user } = this.props.state.auth;
      const comment_id = this.commentId;
      const user_id = user.id;
      return this.props.handleSubmit({content, comment_id, user_id, translate_language_id});
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  selectedNationalFlag(countryId){
    let src;
    switch(countryId){
      case 1:
        src = "japan";
        break;
      case 2:
        src = "america";
        break;
    }
    return <img className="uk-box-shadow-medium" src={`/image/flag/${src}.png`} style={{border: "1px solid #dcdcdc"}} width="25" height="25" alt=""/>;
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { currentComment } = this.props.state.comments;
    const { currentQuestion } = this.props.state.questions;

    if (isEmptyObject(currentComment)) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    const user = (currentComment.user) ? currentComment.user : null;
    const userName = (user) ? user.name : '';
    const toQuestionViewLink = !isEmptyObject(currentQuestion)
                             ? (<p><Link to={`/questions/${currentQuestion.id}`}>{formatMessage({id: "links.to_question_view"})}</Link></p>)
                             : '';                         
    const nationalFlag = this.selectedNationalFlag(user.country_id);

    return (
    <main className="uk-container uk-container-small">
      <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
        <p><Linkify properties={{ target: '_blank'}} >{currentComment.content}</Linkify></p>
        <p className="uk-text-meta">{dayjs(currentComment.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
        <div className="uk-grid uk-grid-small uk-flex-middle" >
          <div className="uk-width-auto">
            <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
          </div>
          <div>
            <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ userName }</Link></h4>
          </div>
          <div className="uk-width-expand" >
            { nationalFlag }
          </div>
        </div>
      </div>
      <h3 className="uk-heading-line"><span>{formatMessage({id: "titles.translation_list"})}</span></h3>
      <CommentTranslationForm commentId={this.commentId} onSubmit={this.handleSubmit.bind(this)} />
      <CommentTranslationList commentId={this.commentId} />
      <hr className="uk-divider-icon" />
      { toQuestionViewLink }
      <p><Link to="/">Top</Link></p>
    </main>
    );
  }
}

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getCommentById: (id) => dispatch(fetchSingleComment(id)),
    handleSubmit: (postData) => dispatch(postCommentTranslationData(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CommentTranslationView));
