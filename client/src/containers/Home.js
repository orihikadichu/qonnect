import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  postQuestionData,
} from '../actions/Question';
import {
  updateCurrentLanguage,
} from '../actions/Intl';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (postData) => dispatch(postQuestionData(postData)),
    changeLanguage: (locale) => dispatch(updateCurrentLanguage(locale))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
