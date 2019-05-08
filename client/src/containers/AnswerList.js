import { connect } from 'react-redux';
import { fetchAnswerList } from '../actions/Answer';
import { postComment } from '../actions/Comment';
import AnswerList from '../components/AnswerList';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (data) => dispatch(fetchAnswerList(data)),
        handlePostComment: (data) => dispatch(postComment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);
