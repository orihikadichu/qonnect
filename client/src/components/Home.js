import React from 'react';
import QuestionList from '../containers/QuestionList';
import QuestionForm from './QuestionForm';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
    const { locale, translateLanguageId } = this.props.state.intl;
    const questionFormInitVals = {
      content: '',
      country_id: '',
      translate_language_id: ''
    };

    return (
      <main className="uk-container uk-container-small">
        {/* <FormattedMessage id="hello" /> */}
        <QuestionForm initialValues={questionFormInitVals} onSubmit={this.submitQuestionForm.bind(this)} />
        {/*未編集の質問一覧表示するサイト*/}
        <p><Link to={`/not_translated`}>未翻訳の一覧を見る</Link></p>
        <h3 className="uk-heading-line"><span>質問一覧</span></h3>
        <div className="uk-margin">
          <select className="uk-select" value={locale} onChange={e => this.props.changeLanguage(e.target.value)} >
            <option value="ja" >日本語</option>
            <option value="en" >英語</option>
          </select>
        </div>
        <QuestionList translate_language_id={translateLanguageId} />
      </main>
    );
  }
};

export default Home;
