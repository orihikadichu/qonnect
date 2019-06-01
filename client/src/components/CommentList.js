import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Comment from './Comment';
import { getFilteredContents, getTranslatedContents } from '../utils/Translations';


class CommentList extends Component {

  render() {
    const { loginUser, translateLanguageId } = this.props;
    const commentList = this.props.list ? this.props.list : [];
    const contentType = 'comment_translations';
    const filteredCommentList = getFilteredContents(commentList, translateLanguageId, contentType);
    const translatedCommentList = getTranslatedContents(filteredCommentList, translateLanguageId, contentType);
    return (
      <ul className="uk-comment-list" >
        { translatedCommentList.map((v, i) => {
            const isOwner = loginUser.id === v.user.id;
            const voteState = v.votes.length !== 0;
            return (
              <li className="uk-margin-small-top" key={i} >
                <Comment id={v.id} user={v.user} content={v.dispText} isOwner={isOwner} voteState={ voteState } />
              </li>
            );
        })}
      </ul>
    );
  }
}

export default CommentList;
