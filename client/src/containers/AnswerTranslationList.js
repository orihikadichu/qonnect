import { connect } from 'react-redux';
import { fetchAnswerTranslationList } from '../actions/AnswerTranslation';
import AnswerTranslationList from '../components/AnswerTranslationList';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (answer_id) => dispatch(fetchAnswerTranslationList(answer_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerTranslationList);
