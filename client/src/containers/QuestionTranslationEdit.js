import { connect } from 'react-redux';
import QuestionTranslationEdit from '../components/QuestionTranslationEdit';
import {
  fetchQuestionTranslation,
  saveQuestionTranslationData,
  deleteQuestionTranslation,
} from '../actions/QuestionTranslation';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestionTranslationById: (id) => dispatch(fetchQuestionTranslation(id)),
    handleSubmit: (postData) => dispatch(saveQuestionTranslationData(postData)),
    deleteQuestionTranslation: (conditions) => dispatch(deleteQuestionTranslation(conditions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTranslationEdit);
