import React from 'react';
import QuestionList from '../containers/QuestionList';
import QuestionForm from './QuestionForm';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  submitQuestionForm(formData) {
    try {
      const { content, translate_language_id, country_id } = formData;
      const { user } = this.props.state.auth;
      const user_id = user.id;
      const postData = { content, user_id, translate_language_id, country_id };
      return this.props.handleSubmit(postData);
    } catch (e) {
      console.log('e.message', e.message);
      return;
    }
  }

  render() {
    const { translateLanguageId } = this.props.state.questions;
    const questionFormInitVals = {
      content: '',
      country_id: '',
      translate_language_id: ''
    };

    return (
      <main className="uk-container uk-container-small">
        <QuestionForm initialValues={questionFormInitVals} onSubmit={this.submitQuestionForm.bind(this)} />
        <h3 className="uk-heading-line"><span>質問一覧</span></h3>
        {/*未編集の質問一覧表示するサイト*/}
        <p><Link to={`/nottranslated`}>一覧を見る</Link></p>
        <div className="uk-margin">
          <select className="uk-select" onChange={e => this.props.changeLanguage(e.target.value)} >
            <option value="1" >日本語</option>
            <option value="2" >英語</option>
          </select>
        </div>
        <QuestionList translate_language_id={translateLanguageId} />
      </main>
    );
  }
};

export default Home;
