import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  postQuestionData,
  updateCurrentTranslateLanguage
} from '../actions/Question';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (postData) => dispatch(postQuestionData(postData)),
    changeLanguage: (translate_language_id) => dispatch(updateCurrentTranslateLanguage(translate_language_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
