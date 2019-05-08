import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';
import AddForm from './AddForm';
import QuestionList from './QuestionList';
import QuestionView from './QuestionView';

// Styles
import '../css/skeleton.css';
import '../css/normalize.css';
import '../css/main.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/questions/:id' component={QuestionView} />
          <AddForm store={this.props.store} />
          <QuestionList store={this.props.store} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
