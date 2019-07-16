import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Comment from './Comment';
import { getFilteredContents, getTranslatedContents } from '../utils/Translations';


class CommentList extends Component {

  render() {
    const { loginUser, translateLanguageId } = this.props;
    const commentList = this.props.list ? this.props.list : [];
    const contentType = 'comment_translations';
    const translatedCommentList = getTranslatedContents(commentList, translateLanguageId, contentType);

    return (
      <ul className="uk-comment-list" >
        { translatedCommentList.map((v, i) => {
            const isOwner = loginUser.id === v.user.id;
            const voteState = v.votes;

            return (
              <li className="uk-margin-small-top" key={i} >
                <Comment id={v.id} answerId={v.answer_id} commentUser={v.user} content={v.dispText} isOwner={isOwner} voteList={ voteState } />
              </li>
            );
        })}
      </ul>
    );
  }
}

export default CommentList;
