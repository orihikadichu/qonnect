import { connect } from 'react-redux';
import UserOnly from '../../components/auth/UserOnly';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOnly);
