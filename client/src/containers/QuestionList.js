import { connect } from 'react-redux';
import { fetchQuestionList } from '../actions/Question';
import QuestionList from '../components/QuestionList';

const mapStateToProps = state => {
    return {state};
};
//this.propsにhandleFetchData: (queryData)という関数をつける
//その関数はfetchQuestionList(queryData)という関数を発火させる。
//'../actions/Question'のfetchQuestionListを発火させる。
const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (queryData) => dispatch(fetchQuestionList(queryData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
