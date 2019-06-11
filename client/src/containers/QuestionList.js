import { connect } from 'react-redux';
import { fetchQuestionList } from '../actions/Question';
import QuestionList from '../components/QuestionList';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (queryData) => dispatch(fetchQuestionList(queryData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
