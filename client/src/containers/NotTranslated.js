import { connect } from 'react-redux';
import { fetchNotTranslated } from '../actions/NotTranslated';
import NotTranslated from '../components/NotTranslated';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleFetchData: (queryData) => dispatch(fetchNotTranslated(queryData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotTranslated);