import { compose } from 'redux';
import { connect } from 'react-redux';
import MenuDrawer from '../../components/layouts/MenuDrawer';
import { withStyles } from '@material-ui/core/styles';
import { logoutUser } from '../../actions/User';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

const mapStateToProps = state => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        logout: (data) => dispatch(logoutUser(data)),
    };
};

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withStyles(styles)
// )(MenuDrawer);
export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);
