import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Comment extends Component {

  render() {
    const { id, user, content, isOwner } = this.props;
    const editLink = isOwner
                   ? <Link to={`/comments/edit/${id}`}>編集</Link>
                   : '';

    return (
      <article className="uk-comment uk-comment-primary">
        <div className="uk-comment-header uk-comment-body">
          <p style={{"whiteSpace": "pre-wrap"}} >
            {content}
            <Link to={`/comment_translations/${id}`}><span uk-icon="world"></span></Link>
          </p>
        </div>
        <div className="uk-grid uk-grid-small uk-flex-middle" >
          <div className="uk-width-auto">
            <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
          </div>
          <div className="uk-width-expand">
            <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ user.name }</Link></h4>
          </div>
          { editLink }
          <Link to={""}><span uk-icon="star"></span></Link>
        </div>
      </article>
    );
  }
}

export default Comment;
