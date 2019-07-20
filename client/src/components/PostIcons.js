import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostIcons extends Component {

    getVoteButton(voteState) {
        const {
            user,
            loginUser,
            onClickHandleVote,
        } = this.props;

        if (user.id === loginUser.id) {
            return (
                <a>
                    <FontAwesomeIcon icon={['far','heart']} color="gray"  size="lg" className="NoUser"/>
                </a>
            );
        }
        if (voteState) {
            return (
                //sends
                <a onClick={onClickHandleVote}>
                    <FontAwesomeIcon icon={['far','heart']} color="gray"  size="lg"/>
                </a>
            );
        }
        return (
            //delete
            <a onClick={onClickHandleVote}>
            <FontAwesomeIcon icon="heart" color="red" size="lg"/>
            </a>
        );
    }

    render() {
        const { 
            user, 
            loginUser, 
            votes, 
            editLink,
            translateLink,
            voteState,
            translate
        } = this.props;
        
        const editLinkButton = user.id === loginUser.id
                             ? <Link className="uk-margin-small-right" to={editLink}><FontAwesomeIcon icon="edit" color="steelblue" size="lg"/></Link>
                             : '';

        const votebutton = this.getVoteButton(voteState);

        const voteNumbers = <span className="uk-margin-small-right uk-text-default">{ votes.length }</span>;

        const translateButton = translate === true
        ? (
          <Link to={translateLink}>
            <FontAwesomeIcon icon="globe-americas" color="steelblue" size="lg"/>
          </Link>
        )
        : "";

        return (
        <div>
            { votebutton }
            { voteNumbers }
            { editLinkButton }
            { translateButton }
        </div>
        );
  }
}

export default PostIcons;
