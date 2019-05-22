import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import QuestionView from './containers/QuestionView';
import QuestionEdit from './containers/QuestionEdit';

//未翻訳の質問一覧を表示するコンポーネント
import NotTranslatedAnswerList from './components/NotTranslatedAnswerList';

import AnswerEdit from './containers/AnswerEdit';
import CommentEdit from './containers/CommentEdit';
import QuestionTranslationView from './containers/QuestionTranslationView';
import QuestionTranslationEdit from './containers/QuestionTranslationEdit';
import AnswerTranslationView from './containers/AnswerTranslationView';
import AnswerTranslationEdit from './containers/AnswerTranslationEdit';
import CommentTranslationView from './containers/CommentTranslationView';
/* import CommentTranslationEdit from './containers/CommentTranslationEdit';*/
import App from './containers/App';
import ScrollToTop from './components/layouts/ScrollToTop';
import SignUp from './containers/users/SignUp';
import Login from './containers/users/Login';
import Profile from './containers/users/Profile';
import ProfileEdit from './containers/users/ProfileEdit';
import UserOnly from './containers/auth/UserOnly';
import GuestOnly from './containers/auth/GuestOnly';
import { Provider } from 'react-redux';
import store from './store';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// Styles
/* import './css/skeleton.css';*/
import './css/normalize.css';
import './css/main.css';
import './css/uikit.min.css';
/* import './css/uikit-rtl.min.css';*/

// JS
UIkit.use(Icons);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <ScrollToTop>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/questions/:id' component={QuestionView}  onEnter={() => window.scrollTo(0, 0)}/>
              <Route exact path='/question_translations/:question_id' component={QuestionTranslationView} />
              <Route exact path='/answer_translations/:answer_id' component={AnswerTranslationView} />
              <Route path='/comment_translations/:comment_id' component={CommentTranslationView} />
              <Route path='/users/profile/:id' component={Profile} />
              <Route path='/users/login' component={Login} />
              <Route path='/users/signup' component={SignUp} />
              <UserOnly>
                <Switch>
                  <Route exact path='/questions/edit/:id' component={QuestionEdit} />
                  <Route exact path='/answers/edit/:id' component={AnswerEdit} />
                  <Route path='/comments/edit/:id' component={CommentEdit} />
                  <Route path='/users/profile_edit' component={ProfileEdit} />
                  <Route exact path='/question_translations/edit/:id' component={QuestionTranslationEdit} />
                  <Route exact path='/answer_translations/edit/:id' component={AnswerTranslationEdit} />
                  {/*未翻訳の質問を抽出するルートパス*/}
                  <Route exact path='/nottranslated' component={NotTranslatedAnswerList} />
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
