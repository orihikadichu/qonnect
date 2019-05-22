import { connect } from 'react-redux';
import { fetchAnswerList } from '../actions/Answer';
import { postComment } from '../actions/Comment';
import AnswerList from '../components/AnswerList';


//stateの
const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (data) => dispatch(fetchAnswerList(data)),
        handlePostComment: (data) => dispatch(postComment(data)),
    };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);
