import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

class CommentEdit extends Component {
  constructor(props) {
    super(props);
    const { params } = props.match;
    this.commentId = parseInt(params.id, 10);
  }

  componentWillMount() {
    this.props.getCommentById(this.commentId);
  }

  notOwnerWillTransfer(currentComment) {
    const owner = currentComment.user;
    const loginUser = this.props.state.auth.user;
    const { history } = this.props;
    if (owner.id !== loginUser.id) {
      return history.push('/');
    }
    return true;
  }

  handleSubmit(formData) {
    try {
      const { currentComment } = this.props.state.comments;
      const { content, translate_language_id } = formData;
      const { history } = this.props;
      const comment_id = this.commentId;
      const { answer_id } = currentComment;
      const { question_id } = currentComment.answer;
      const saveData = { content, comment_id, translate_language_id, history, answer_id, question_id };
      return this.props.handleSubmit(saveData);
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  onClickDeleteBtn(e) {
    try {
      const { user } = this.props.state.auth;
      const { currentComment } = this.props.state.comments;
      const { question_id } = currentComment.answer;
      const { history } = this.props;
      const params = {
        user_id: user.id,
        comment_id: this.commentId,
        question_id,
        history
      };
      return this.props.deleteComment(params);
    } catch (e) {
      return;
    }
  }

  render() {
    const { currentComment } = this.props.state.comments;

    if (Object.keys(currentComment).length === 0) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    this.notOwnerWillTransfer(currentComment);

    return (
      <main className="uk-container uk-container-small">
        <h2>コメントの編集</h2>
        <CommentForm initialValues={currentComment} onSubmit={this.handleSubmit.bind(this)} />
        <p><button className="uk-button uk-button-danger" onClick={this.onClickDeleteBtn.bind(this)}>このコメントを削除</button></p>
        <Link to="/">Top</Link>
      </main>
    );
  }
}

export default CommentEdit;
