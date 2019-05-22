import { connect } from 'react-redux';
import AnswerTranslationEdit from '../components/AnswerTranslationEdit';
import {
  fetchAnswerTranslation,
  saveAnswerTranslationData,
  deleteAnswerTranslation,
} from '../actions/AnswerTranslation';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getAnswerTranslationById: (id) => dispatch(fetchAnswerTranslation(id)),
    handleSubmit: (postData) => dispatch(saveAnswerTranslationData(postData)),
    deleteAnswerTranslation: (conditions) => dispatch(deleteAnswerTranslation(conditions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerTranslationEdit);
