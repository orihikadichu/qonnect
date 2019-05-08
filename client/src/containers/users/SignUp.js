import { connect } from 'react-redux';
import SignUp from '../../components/users/SignUp';
import {
    createUserAccount,
    saveUserMnemonic
} from '../../actions/User';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        clickSubmit: (data) => dispatch(createUserAccount(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
