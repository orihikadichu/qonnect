import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  postQuestionData,
  fetchQuestionList 
} from '../actions/Question';
import {
  updateCurrentLanguage,
} from '../actions/Intl';
import {
  updateCurrentCategory,
} from '../actions/Category';
import {
  actionAlertMessage,
} from '../actions/Notification';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (postData) => dispatch(postQuestionData(postData)),
    changeLanguage: (locale) => dispatch(updateCurrentLanguage(locale)),
    changeCategory: (category) => dispatch(updateCurrentCategory(category)),
    handleFetchData: (queryData) => dispatch(fetchQuestionList(queryData)),
    alertMessage: (message) => dispatch(actionAlertMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
