import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  postQuestionData,
} from '../actions/Question';
import {
  updateCurrentLanguage,
} from '../actions/Intl';
import {
  updateCurrentCategory,
} from '../actions/Category';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (postData) => dispatch(postQuestionData(postData)),
    changeLanguage: (locale) => dispatch(updateCurrentLanguage(locale)),
    changeCategory: (category) => dispatch(updateCurrentCategory(category))    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
