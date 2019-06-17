import { connect } from 'react-redux';
import Activate from '../../components/users/Activate';
import {
  activateUser,
} from '../../actions/User';

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    activateUser: (token) => dispatch(activateUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
