import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import QuestionListView from './QuestionListView';

class QuestionList extends Component {

  componentDidMount() {
    const { questionArray, translateLanguageId } = this.props.state.questions;

    const { country_id } = this.props.state.auth.user;
    if (questionArray.length !== 0) {
      return;
    }
    const translate_language_id = translateLanguageId;
    let params = {};
    if (country_id) {
      params.country_id = country_id;
    }
    this.props.handleFetchData(params);

  }

  render() {
    const { isFetching, questionArray, translateLanguageId } = this.props.state.questions;
    if (isFetching) {
      return (<ClipLoader />);
    }

    return (
      <QuestionListView questionArray={questionArray} translateLanguageId={translateLanguageId} loginUser={this.props.state.auth.user.id}/>
    );
  }
}

export default QuestionList;
