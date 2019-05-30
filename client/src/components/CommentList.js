import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Comment from './Comment';

class CommentList extends Component {

  getFilteredComments(commentArray, translateLanguageId) {
    const filteredComments = commentArray.filter((v) => {
      if (v.translate_language_id === translateLanguageId) {
        return true;
      }
      const targetTranslationsNum = v.comment_translations.filter((v) => {
        return (v.translate_language_id === translateLanguageId);
      }).length;
      return (targetTranslationsNum !== 0);
    });
    return filteredComments;
  }

  getTranslatedComments(comments, translateLanguageId) {
    const translatedComments = comments.map((v) => {
      if (v.translate_language_id === translateLanguageId) {
        v.dispText = v.content;
        return v;
      }
      const commentTranslation = v.comment_translations.filter(v => {
        return (v.translate_language_id === translateLanguageId);
      })[0];

      v.dispText = commentTranslation.content;
      return v;
    });
    return translatedComments;
  }

  render() {
    const { loginUser, translateLanguageId } = this.props;
    const commentList = this.props.list ? this.props.list : [];
    const filteredCommentList = this.getFilteredComments(commentList, translateLanguageId);
    const translatedCommentList = this.getTranslatedComments(filteredCommentList, translateLanguageId);
    return (
      <ul className="uk-comment-list" >
        { translatedCommentList.map((v, i) => {
            const isOwner = loginUser.id === v.user.id;
            return (
              <li className="uk-margin-small-top" key={i} >
                <Comment id={v.id} user={v.user} content={v.dispText} isOwner={isOwner}/>
              </li>
            );
        }) }
      </ul>
    );
  }
}

export default CommentList;
