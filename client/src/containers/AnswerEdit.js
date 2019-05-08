import { connect } from 'react-redux';
import AnswerEdit from '../components/AnswerEdit';
import {
  fetchAnswer,
  saveAnswerData,
  deleteAnswer,
} from '../actions/Answer';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getAnswerById: (id) => dispatch(fetchAnswer(id)),
    handleSubmit: (postData) => dispatch(saveAnswerData(postData)),
    deleteAnswer: (params) => dispatch(deleteAnswer(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerEdit);
