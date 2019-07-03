import React from 'react';
import QuestionList from '../containers/QuestionList';
import QuestionForm from './QuestionForm';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';

class Home extends React.Component {

  submitQuestionForm(formData) {
    try {
      const { user, isLoggedIn } = this.props.state.auth;
      console.log("this.props",this.props);
      if (!isLoggedIn) {
        const { history } = this.props;
        this.props.alertMessage("ログインしてください。");
        return history.push("/users/login");
      }
      const { content, translate_language_id, country_id, category_id } = formData;
      const user_id = user.id;
      const postData = { content, user_id, translate_language_id, country_id, category_id };
      return this.props.handleSubmit(postData);
    } catch (e) {
      console.log('e.message', e.message);
      return;
    }
  }

  selectedCategory(value) {
    switch(value) {
      case "all" :
        return 0;
      case "comic_anime":
        return 1;
      case "culture":
        return 2;
      case "tourism":
        return 3;
      case "music":
        return 4;
      default:
        return 0;
    }
  }

  selectedSort(value) {
    switch(value) {
      case "answerMany":
        return 1;
      case "answerFew":
        return 2;
      case "Asc":
        return 3;
      case "Des":
        return 4;
      default:
        return 4;
    }
  }

  onChangeLanguage(locale, e) {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem('locale', locale);
    // かなり不適切な書き方だが一旦ここでリダイレクトさせるようにしておく
    window.location.href = '/';
    return;
  }

  changeSortfunction(value){
    this.props.changeSort(value);
    let params;
    params = {};
    this.props.handleFetchData(params);
  }

  changeCateogryfunction(value) {
     this.props.changeCategory(value);
     let params;
     params = {};
     this.props.handleFetchData(params);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { locale, translateLanguageId } = this.props.state.intl;
    const { category } = this.props.state.ctgr;
    const { sort } = this.props.state.sort;
    const { auth } = this.props.state;
    const questionFormInitVals = {
      content: '',
      country_id: '',
      translate_language_id: '',
      category_id: ''
    };

    return (
      <main className="uk-container uk-container-small">
        <div className="uk-width-auto uk-margin-bottom uk-text-right" >
          <span>
            <a href="/" onClick={this.onChangeLanguage.bind(this, 'ja')} >
              { formatMessage({id: "languages.japanese" })}
            </a>
          </span>
          <span className="uk-margin-small-left">
            <a href="/" onClick={this.onChangeLanguage.bind(this, 'en')} >
              { formatMessage({id: "languages.english" })}
            </a>
          </span>
        </div>
        <QuestionForm initialValues={questionFormInitVals} loginUser={auth} onSubmit={this.submitQuestionForm.bind(this)} formName="questionForm"/>
        {/* 言語切り替え */}
        <h3 className="uk-heading-line"><span>{ formatMessage({id: "titles.question_list" })}</span></h3>
        <div className="uk-margin uk-grid uk-grid-small uk-child-width-expand@s" >
          {/* カテゴリー切り替え */}
          <div className="uk-grid-margin" >
            <select className="uk-select" value={category} onChange={e => this.changeCateogryfunction( e.target.value )} >
              <option value="all" >{ formatMessage({id: "categories.all" })}</option>
              <option value="comic_anime" >{ formatMessage({id: "categories.comic_anime" })}</option>
              <option value="culture" >{ formatMessage({id: "categories.culture" })}</option>
              <option value="tourism" >{ formatMessage({id: "categories.tourism" })}</option>
              <option value="music" >{ formatMessage({id: "categories.music" })}</option>
            </select>
          </div>
          {/* ソート */}
          <div className="uk-grid-margin" >
            <select className="uk-select" value={sort} onChange={e => this.changeSortfunction( e.target.value )} >
              <option value="answerMany" >{ formatMessage({id: "sort.answerMany" })}</option>
              <option value="answerFew" >{ formatMessage({id: "sort.answerFew" })}</option>
              <option value="Asc" >{ formatMessage({id: "sort.Asc" })}</option>
              <option value="Des" >{ formatMessage({id: "sort.Des" })}</option>
            </select>
          </div>
        </div>
        <QuestionList translate_language_id={translateLanguageId}/>
      </main>
    );
  }
};

export default injectIntl(Home);