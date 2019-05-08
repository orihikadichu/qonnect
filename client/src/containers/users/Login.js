import { connect } from 'react-redux';
import Login from '../../components/users/Login';
import {
    loginUser
} from '../../actions/User';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (data) => dispatch(loginUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
