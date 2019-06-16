import { connect } from 'react-redux';
import PasswordReset from '../../components/users/PasswordReset';
import {
  sendResetPasswordMail
} from '../../actions/User';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (data) => dispatch(sendResetPasswordMail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
