import React, { Component } from 'react';
import Comment from './Comment';

class CommentList extends Component {

  render() {
    const { loginUser } = this.props;
    const commentList = this.props.list ? this.props.list : [];
    return (
      <ul className="uk-comment-list" >
        { commentList.map((v, i) => {
            const isOwner = loginUser.id === v.user.id;
            return (
              <li className="uk-margin-small-top" key={i} >
                <Comment id={v.id} user={v.user} content={v.content} isOwner={isOwner} />
              </li>
            );
        }) }
      </ul>
    );
  }
}

export default CommentList;
