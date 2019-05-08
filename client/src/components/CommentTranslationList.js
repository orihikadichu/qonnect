import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class CommentTranslationList extends Component {
  constructor(props) {
    super(props);
    this.commentId = this.props.commentId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.commentId);
  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.commentTranslations;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const content = (<div>
      <ul className="uk-list uk-list-divider uk-list-large" >
        {currentTranslationList.map(translation => (
          <li key={translation.id} >
            <p>
              {translation.content}
            </p>
            <p>{translation.user.name}</p>
          </li>))}
      </ul>
    </div>
    );

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default CommentTranslationList;
