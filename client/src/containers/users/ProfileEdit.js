import { connect } from 'react-redux';
import Profile from '../../components/users/Profile';
import {
    loginUser,
    saveUserData
} from '../../actions/User';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        clickedSaveButton: (postData) => dispatch(saveUserData(postData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
