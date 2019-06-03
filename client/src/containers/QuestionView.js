import { connect } from 'react-redux';
import QuestionView from '../components/QuestionView';
import {
    fetchQuestion
} from '../actions/Question';
import {
    postAnswerData,
    fetchAnswerList
} from '../actions/Answer';
//評価するための関数
import { 
    postVote, 
    deleteVote 
} from '../actions/Vote';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        getQuestionById: (id) => dispatch(fetchQuestion(id)),
        handleSubmit: (postData) => dispatch(postAnswerData(postData)),
        fetchAnswers: (question_id) => dispatch(fetchAnswerList(question_id)),
        handlePostVote: (data) => dispatch(postVote(data)),
        handleDeleteVote: (data) => dispatch(deleteVote(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
