import { connect } from 'react-redux';
import CommentEdit from '../components/CommentEdit';
import {
  fetchSingleComment,
  saveCommentData,
  deleteComment,
} from '../actions/Comment';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getCommentById: (id) => dispatch(fetchSingleComment(id)),
    handleSubmit: (postData) => dispatch(saveCommentData(postData)),
    deleteComment: (params) => dispatch(deleteComment(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
