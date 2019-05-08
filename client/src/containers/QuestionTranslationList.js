import { connect } from 'react-redux';
import { fetchQuestionTranslationList } from '../actions/QuestionTranslation';
import QuestionTranslationList from '../components/QuestionTranslationList';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (question_id) => dispatch(fetchQuestionTranslationList(question_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTranslationList);
