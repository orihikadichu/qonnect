import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import Home from './containers/Home';
import QuestionView from './containers/QuestionView';
import QuestionEdit from './containers/QuestionEdit';
import NotTranslated from './containers/NotTranslated';
import AnswerEdit from './containers/AnswerEdit';
import CommentEdit from './containers/CommentEdit';
import QuestionTranslationView from './containers/QuestionTranslationView';
import QuestionTranslationEdit from './containers/QuestionTranslationEdit';
import AnswerTranslationView from './containers/AnswerTranslationView';
import AnswerTranslationEdit from './containers/AnswerTranslationEdit';
import CommentTranslationView from './containers/CommentTranslationView';
import CommentTranslationEdit from './containers/CommentTranslationEdit';
import App from './containers/App';
import ScrollToTop from './components/layouts/ScrollToTop';
import SignUp from './containers/users/SignUp';
import Login from './containers/users/Login';
import PasswordReset from './containers/users/PasswordReset';
import NewPassword from './containers/users/NewPassword';
import Activate from './containers/users/Activate';
import Profile from './containers/users/Profile';
import ProfileEdit from './containers/users/ProfileEdit';
import Contact from './containers/Contact';
import UserOnly from './containers/auth/UserOnly';
import GuestOnly from './containers/auth/GuestOnly';
import { Provider } from 'react-redux';
import store from './store';
import history from './store';
import UIkit from 'uikit';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// Styles
import './css/normalize.css';
import './css/main.css';
import './css/uikit.min.css';

// 言語設定
import { addLocaleData, IntlProvider } from 'react-intl';
import ja from 'react-intl/locale-data/ja';
import en from 'react-intl/locale-data/en';
const { intl } = store.getState();
const { locale, messages } = intl;
addLocaleData([...ja, ...en]);

library.add(fas, far);

// 取り急ぎの質問フォーム初期化処理
localStorage.setItem('question-form', '');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages} >
        <BrowserRouter>
          <App>
            <ScrollToTop>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/questions/:id' component={QuestionView}  onEnter={() => window.scrollTo(0, 0)}/>
                <Route exact path='/question_translations/:question_id' component={QuestionTranslationView} />
                <Route exact path='/answer_translations/:answer_id' component={AnswerTranslationView} />
                <Route exact path='/comment_translations/:comment_id' component={CommentTranslationView} />
                <Route exact path='/users/profile/:id' component={Profile} />
                <Route exact path='/users/login' component={Login} />
                <Route exact path='/users/signup' component={SignUp} />
                <Route exact path='/users/activate/:token' component={Activate} />
                <Route exact path='/users/password_reset' component={PasswordReset} />
                <Route exact path='/users/password_reset/:token' component={NewPassword} />
                <Route exact path='/contact' component={Contact} />
                <UserOnly>
                  <Switch>
                    <Route exact path='/questions/edit/:id' component={QuestionEdit} />
                    <Route exact path='/answers/edit/:id' component={AnswerEdit} />
                    <Route exact path='/comments/edit/:id' component={CommentEdit} />
                    <Route exact path='/users/profile_edit' component={ProfileEdit} />
                    <Route exact path='/question_translations/edit/:id' component={QuestionTranslationEdit} />
                    <Route exact path='/answer_translations/edit/:id' component={AnswerTranslationEdit} />
                    <Route exact path='/comment_translations/edit/:id' component={CommentTranslationEdit} />
                    {/*未翻訳の質問を抽出するルートパス*/}
                    <Route exact path='/not_translated' component={NotTranslated} />
                  </Switch>
                </UserOnly>
                <GuestOnly>
                  <Switch>
                  </Switch>
                </GuestOnly>
              </Switch>
            </ScrollToTop>
          </App>
        </BrowserRouter>
      </IntlProvider>
    </Provider>,
    document.getElementById('root')
  );
};

store.subscribe(() => {
  render();
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

render()
