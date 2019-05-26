import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class NotTranslated extends Component {

  componentDidMount() {
    const { questions } = this.props.state.not_translate;
    // const { country_id } = this.props.state.auth.user;
    if (questions.length !== 0) {
      return;
    }
    // const translate_language_id = translateLanguageId;
    let params = {};
    // if (country_id) {
    //   params.country_id = country_id;
    // }
    this.props.handleFetchData(params);
  }

  getNotTranslatedView(state) {
    
    const {isFetching, questions} = state.not_translate;
    
    //読み込み中であることを示す。
    if (isFetching) {
      return (<ClipLoader />);
    }

    return (
      <div>
        <ul className="uk-list uk-list-divider uk-list-large">
          {questions.map((v) => {
            return(
              <div className="uk-list uk-list-divider uk-list-large">
                <li>
                  {v.content}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    const content = this.getNotTranslatedView(this.props.state);
    return (
      <div>
        未翻訳コンテンツ一覧
        {content}
      </div>
    );
  }
}

export default NotTranslated;
