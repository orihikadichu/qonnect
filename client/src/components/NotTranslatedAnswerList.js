import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import AnswerForm from './AnswerForm';

class NotTranslatedAnswerList extends Component {
  render() {
    console.log("ここまで");
    return (
      <main className="uk-container uk-container-small">
        <h2>ここに未翻訳の質問集を表示する。</h2>
        <Link to="/">Top</Link>
      </main>
    );
  }
}

export default NotTranslatedAnswerList;
