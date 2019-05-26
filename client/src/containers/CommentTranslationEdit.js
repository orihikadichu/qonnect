import { connect } from 'react-redux';
import CommentTranslationEdit from '../components/CommentTranslationEdit';
import {
  fetchCommentTranslation,
  saveCommentTranslationData,
  deleteCommentTranslation,
} from '../actions/CommentTranslation';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getCommentTranslationById: (id) => dispatch(fetchCommentTranslation(id)),
    handleSubmit: (postData) => dispatch(saveCommentTranslationData(postData)),
    deleteCommentTranslation: (conditions) => dispatch(deleteCommentTranslation(conditions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentTranslationEdit);
