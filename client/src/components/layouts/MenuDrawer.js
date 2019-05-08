import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class MenuDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  getLogoutLink(user) {
    if (!user.id) {
      return '';
    }
    const { history } = this.props;
    const actionData = { history };
    return (
      <Link to="/" onClick={this.props.logout.bind(this, actionData)}>Logout</Link>
    );
  }

  render() {
    const { classes, displayName } = this.props;

    const menuDataList = [
      {
        text: 'プロフィール',
        component: Link,
        to: '/users/profile_edit',
      },
      {
        text: 'ログアウト',
        component: Link,
        to: '/users/logout',
      },
    ];

    const sideList = (
      <div className={classes.list}>
        <List>
          {menuDataList.map((menuData, index) => (
            <ListItem button component={menuData.component} to={menuData.to}  key={index} >
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={menuData.text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className="uk-display-inline-block" >
        <Button onClick={this.toggleDrawer('right', true)}>{ displayName }</Button>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  displayName: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuDrawer);
