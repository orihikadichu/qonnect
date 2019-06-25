import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import Header from '../containers/layouts/Header';
import { ClipLoader } from 'react-spinners';
import ReactGA from 'react-ga';

class App extends Component {
  componentWillMount() {
    this.props.fetchLoginState();
  }

  componentDidMount() {
    // const { pathname } = this.props.location;
    console.log("appjs-------------",this.props);
    // ReactGA.set({ page: pathname });
    // ReactGA.pageview(pathname);
  }

  handleLogout() {
    //this.props.dispatch(clickLogout());
  }

  render() {
    const { children } = this.props;
    const { auth } = this.props.state;

    return auth.isPrepared ? (
      <BrowserRouter >
        <div className="uk-margin-bottom" >
          <Header />
          {children}
          <NotificationsSystem theme={theme} />
        </div>
      </BrowserRouter>
    ) : (
      <div className="uk-position-center uk-overlay uk-overlay-default">
        <ClipLoader />
      </div>
    );
  }
}

export default App;
