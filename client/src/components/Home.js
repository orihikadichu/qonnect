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

  selectedCategory(value){
    switch( value ){
      case "all" :
        return 0;
      case "subculture":
        return 1;
      case "culture":
        return 2;
      case "tourism":
        return 3;
      case "music":
        return 4;
    }
  }

  changeCateogryfunction(value){
     this.props.changeCategory(value)
     const categoryId = this.selectedCategory(value);
     let params 
     params = {};
     if (categoryId !== 0){
       params = { category_id: categoryId };
     }
     this.props.handleFetchData(params);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { locale, translateLanguageId } = this.props.state.intl;
    const { category } = this.props.state.ctgr;
    const { auth } = this.props.state;
    const questionFormInitVals = {
      content: '',
      country_id: '',
      translate_language_id: '',
      category_id: ''
    };

    return (
      <main className="uk-container uk-container-small">
        <QuestionForm initialValues={questionFormInitVals} loginUser={auth} onSubmit={this.submitQuestionForm.bind(this)} />
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
          <select className="uk-select" value={category} onChange={e => this.changeCateogryfunction( e.target.value )} >
            <option value="all" >{ formatMessage({id: "categories.all" })}</option>
            <option value="subculture" >{ formatMessage({id: "categories.subculture" })}</option>
            <option value="culture" >{ formatMessage({id: "categories.culture" })}</option>
            <option value="tourism" >{ formatMessage({id: "categories.tourism" })}</option>
            <option value="music" >{ formatMessage({id: "categories.music" })}</option>
          </select>
        </div>
        <QuestionList translate_language_id={translateLanguageId}/>  
      </main>
    );
  }
};

export default injectIntl(Home);