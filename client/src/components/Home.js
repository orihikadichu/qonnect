import React from 'react';
import QuestionList from '../containers/QuestionList';
import QuestionForm from './QuestionForm';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';

class Home extends React.Component {

  submitQuestionForm(formData) {
    try {
      const { content, translate_language_id, country_id, category_id } = formData;
      const { user } = this.props.state.auth;
      const user_id = user.id;
      const postData = { content, user_id, translate_language_id, country_id, category_id };
      return this.props.handleSubmit(postData);
    } catch (e) {
      console.log('e.message', e.message);
      return;
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { locale, translateLanguageId } = this.props.state.intl;
    const { category, categoryId } = this.props.state.ctgr;
    const questionFormInitVals = {
      content: '',
      country_id: '',
      translate_language_id: '',
      category_id: ''
    };

    return (
      <main className="uk-container uk-container-small">
        <QuestionForm initialValues={questionFormInitVals} onSubmit={this.submitQuestionForm.bind(this)} />
        {/*未編集の質問一覧表示するサイト*/}
        <p><Link to={`/not_translated`}>{ formatMessage({id: "links.to_not_translated_list"}) }</Link></p>
        {/* 言語切り替え */}
        <h3 className="uk-heading-line"><span>{ formatMessage({id: "titles.question_list" })}</span></h3>
        <div className="uk-margin">
          <select className="uk-select" value={locale} onChange={e => this.props.changeLanguage(e.target.value)} >
            <option value="ja" >{ formatMessage({id: "languages.japanese" })}</option>
            <option value="en" >{ formatMessage({id: "languages.english" })}</option>
          </select>
        </div>
        {/* カテゴリー切り替え */}
        <div className="uk-margin">
          <select className="uk-select" value={category} onChange={e => this.props.changeCategory(e.target.value)} >
            <option value="all" >{ formatMessage({id: "categories.all" })}</option>
            <option value="subculture" >{ formatMessage({id: "categories.subculture" })}</option>
            <option value="culture" >{ formatMessage({id: "categories.culture" })}</option>
            <option value="tourism" >{ formatMessage({id: "categories.tourism" })}</option>
          </select>
        </div>
        <QuestionList translate_language_id={translateLanguageId}/>
      </main>
    );
  }
};

export default injectIntl(Home);