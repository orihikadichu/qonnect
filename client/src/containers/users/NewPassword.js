import { connect } from 'react-redux';
import NewPassword from '../../components/users/NewPassword';
import {
  saveUserPassword,
  getUserByToken,
} from '../../actions/User';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (token) => dispatch(getUserByToken(token)),
    handleSubmit: (data) => dispatch(saveUserPassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
