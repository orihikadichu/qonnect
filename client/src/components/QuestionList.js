import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import QuestionListView from './QuestionListView';

class QuestionList extends Component {

  componentDidMount() {
    const { questionArray } = this.props.state.questions;

    if (questionArray.length !== 0) {
      return;
    }
    let params = {};
    this.props.handleFetchData(params);

  }

  render() {

    const { isFetching, questionArray } = this.props.state.questions;
    const { translateLanguageId } = this.props.state.intl;
    if (isFetching) {
      return (<ClipLoader />);
    }

    return (
      <QuestionListView questionArray={questionArray} translateLanguageId={translateLanguageId} loginUser={this.props.state.auth.user.id}/>
    );
  }
}

export default QuestionList;
