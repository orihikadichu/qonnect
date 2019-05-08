import { connect } from 'react-redux';
import GuestOnly from '../../components/auth/GuestOnly';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestOnly);
