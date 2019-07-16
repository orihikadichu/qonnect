import { connect } from 'react-redux';
import { fetchAnswerList } from '../actions/Answer';
import { postComment } from '../actions/Comment';
import AnswerList from '../components/AnswerList';
//評価するための関数
// import { postVote, deleteVote, handleVote } from '../actions/Vote';
import { handleVote } from '../actions/Vote';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (data) => dispatch(fetchAnswerList(data)),
        handlePostComment: (data) => dispatch(postComment(data)),
        // //評価機能
        // handlePostVote: (data) => dispatch(postVote(data)),
        // //評価の削除機能
        // handleDeleteVote: (data) => dispatch(deleteVote(data)),
        //評価の削除機能
        handleVote: (data) => dispatch(handleVote(data)),
    };
};

//root（全部の状態を持っているオブジェクト）に持っているstateをAnswerListに対して適用する
export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);
