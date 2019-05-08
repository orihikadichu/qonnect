import { connect } from 'react-redux';
import App from '../components/App';
import { loginUserJwt } from '../actions/User.js';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLoginState: () => dispatch(loginUserJwt())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
