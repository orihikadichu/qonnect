import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostIcons extends Component {
  render() {
    const {
      user,
      loginUser,
      votes,
      sendData,
      deleteData,
      editLink,
      translateLink,
      onClickSendVote,
      onClickDeleteVote
    } = this.props;

    const editLinkButton = user.id === loginUser.id
                         ? <Link className="uk-margin-small-right" to={editLink}><FontAwesomeIcon icon="edit" color="steelblue" size="lg"/></Link>
                         : '';

    const myVotes = votes.filter(v => {return v.user_id === loginUser.id});
    const voteState = myVotes.length !== 0;

    let votebutton
    if (voteState) {
      votebutton = (
        <a onClick={onClickDeleteVote.bind(this, deleteData, loginUser.id)}>
          <FontAwesomeIcon icon="heart" color="red" size="lg"/>
        </a>
      );
    } else {
      votebutton = (
        <a onClick={onClickSendVote.bind(this, sendData, loginUser.id)}>
          <FontAwesomeIcon icon={['far','heart']} color="gray"  size="lg"/>
        </a>
      );
    }

    const voteNumbers = <span className="uk-margin-small-right uk-text-default">{ votes.length }</span>;

    return (
      <span>
        { votebutton }
        { voteNumbers }
        { editLinkButton }
        <Link to={translateLink}><FontAwesomeIcon icon="globe-americas" color="steelblue" size="lg"/></Link>
      </span>
    );
  }
}

export default PostIcons;
