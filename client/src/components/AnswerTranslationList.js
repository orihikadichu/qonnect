import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class AnswerTranslationList extends Component {
  constructor(props) {
    super(props);
    this.aId = this.props.aId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.aId);
  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.answerTranslations;

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

export default AnswerTranslationList;
