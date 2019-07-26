import React, { Component } from 'react'
// import AnswerList from '../containers/AnswerList';
// import SingleQuestionTranslation from './SingleQuestionTranslation';
// import Linkify from 'react-linkify';
// import dayjs from 'dayjs';

class HoverComponent extends Component {

  render () {
    const {innerElement} = this.props;

    return (
        <div className="uk-card uk-card-default uk-card-body">
            {innerElement}
        </div>
    );
  }
}

export default HoverComponent;