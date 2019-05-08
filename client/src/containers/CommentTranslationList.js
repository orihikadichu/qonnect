import { connect } from 'react-redux';
import { fetchCommentTranslationList } from '../actions/CommentTranslation';
import CommentTranslationList from '../components/CommentTranslationList';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (answer_id) => dispatch(fetchCommentTranslationList(answer_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentTranslationList);
