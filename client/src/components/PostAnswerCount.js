import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostAnswerCount extends Component {
    render() {
        const { reply } = this.props;

        const commentCount = reply.reduce(
            function (accumulator, currentValue) {
                return accumulator.comments.length + currentValue.comments.length;
            }
        );

        const replyState = <FontAwesomeIcon icon={['fas','reply']} color="steelblue" size="1x"/> ;
        const replyCount = reply.length;
        const commentState = <FontAwesomeIcon className="uk-margin-left" icon={['far','comment-dots']} color="steelblue" size="1x"/> ;

        return (
            <div className="uk-margin-left">
                    { replyState }
                    { replyCount }
                    { commentState }
                    { commentCount }
            </div>
        );
  }
}

export default PostAnswerCount;
