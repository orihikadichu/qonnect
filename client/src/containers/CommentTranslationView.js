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
      console.log('content', content);
      if (content === '') {
        throw new Error('空文字で投稿はできません。');
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

  render() {
    const { currentComment } = this.props.state.comments;
    if (isEmptyObject(currentComment)) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    const user = (currentComment.user) ? currentComment.user : null;
    const userName = (user) ? user.name : '';
    return (
      <main className="uk-container uk-container-small">
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
          <p><Linkify properties={{ target: '_blank'}} >{currentComment.content}</Linkify></p>
          <p className="uk-text-meta">{dayjs(currentComment.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
            </div>
            <div className="uk-width-expand">
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ user.name }</Link></h4>
            </div>
          </div>
        </div>
        <h3 className="uk-heading-line"><span>翻訳一覧</span></h3>
        <CommentTranslationForm commentId={this.commentId} onSubmit={this.handleSubmit.bind(this)} />
        <CommentTranslationList commentId={this.commentId} />
        <hr className="uk-divider-icon" />
        <Link to="/">Top</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentTranslationView);
