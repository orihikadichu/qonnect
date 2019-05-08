import { connect } from 'react-redux';
import QuestionEdit from '../components/QuestionEdit';
import {
  fetchQuestion,
  saveQuestionData,
  deleteQuestion,
} from '../actions/Question';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestionById: (id) => dispatch(fetchQuestion(id)),
    handleSubmit: (postData) => dispatch(saveQuestionData(postData)),
    deleteQuestion: (conditions) => dispatch(deleteQuestion(conditions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEdit);
