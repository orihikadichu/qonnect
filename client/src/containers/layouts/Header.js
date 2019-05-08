import { connect } from 'react-redux';
import Header from '../../components/layouts/Header';
import { logoutUser } from '../../actions/User';

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        logout: (data) => dispatch(logoutUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
