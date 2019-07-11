import React from 'react';
/* import MenuDrawer from '../../containers/layouts/MenuDrawer';*/
import MenuDrawer from './MenuDrawer';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  onClickLogout() {
    const { user } = this.props.state.auth;
    if (!user.id) {
      return '';
    }
    const { history } = this.props;
    const actionData = { history };
    return this.props.logout(actionData);
  }

  getMenu(displayName) {
    const { anchorEl } = this.state;
    const { formatMessage } = this.props.intl;

    const handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const handleLogout = () => {
      handleClose();
      return this.onClickLogout();
    };

    const getProfileElem = (auth) => {
      if (!auth.isLoggedIn) {
        return '';
      }
      const { user } = auth;
      const menuList = [
        {
          text: formatMessage({id: "links.profile"}),
          to: `/users/profile/${user.id}`,
          icon: "user"
        },
        {
          text: formatMessage({id: "links.profile_edit"}),
          to: '/users/profile_edit',
          icon: "pen",
        },
        {
          text: formatMessage({id: "links.to_not_translated_list"}),
          to: `/not_translated`,
          icon: "file-alt"
        },
      ];
      return menuList.map((v, i) => (
        <MenuItem key={i} onClick={handleClose}>
          <Link to={v.to} >
            <span><FontAwesomeIcon icon={v.icon} color="steelblue" size="lg"/></span>
            <span className="uk-margin-small-left">
              {v.text}
            </span>
          </Link>
        </MenuItem>
      ));
    };

    const getLoginElem = (auth) => {
      return (auth.isLoggedIn)
           ? (
             <MenuItem onClick={handleLogout.bind(this)}>
               <Link to="" >
                 <span><FontAwesomeIcon icon="sign-out-alt" color="steelblue" size="lg"/></span>
                 <span className="uk-margin-small-left">
                   {formatMessage({id: "links.logout"})}
                 </span>
               </Link>
             </MenuItem>
           )
           : (
             <MenuItem onClick={handleClose}>
               <Link to="/users/login" >
                 <span><FontAwesomeIcon icon="sign-in-alt" color="steelblue" size="lg"/></span>
                 <span className="uk-margin-small-left">
                   {formatMessage({id: "links.login"})}
                 </span>
               </Link>
             </MenuItem>
           );
    };

    const { auth } = this.props.state;
    const profileElem = getProfileElem(auth);
    const loginElem = getLoginElem(auth);

    return (
      <div className="uk-display-inline-block uk-height-1-1" >
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          className="uk-height-1-1"
          style={{"textTransform": "none"}}
        >
          {displayName}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {profileElem}
          {loginElem}
          <MenuItem onClick={handleClose}>
            <Link to="/users/signup" >
              <span><FontAwesomeIcon icon="user-plus" color="steelblue" size="lg"/></span>
              <span className="uk-margin-small-left">
                {formatMessage({id: "links.sign_up"})}
              </span>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/contact" >
              <span><FontAwesomeIcon icon="envelope" color="steelblue" size="lg"/></span>
              <span className="uk-margin-small-left">
                {formatMessage({id: "links.contact"})}
              </span>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }

  render() {
    const { user } = this.props.state.auth;
    const imagePath = user.image_path ? user.image_path : '/image/profile/blank-profile.png';
    const displayMenuElem = <img src={imagePath} className="uk-border-circle" width="50" height="50" alt="" />;
    const menu = this.getMenu(displayMenuElem);

    return (
      <header className="uk-margin-bottom uk-heading-divider uk-grid uk-grid-small" >
        <div className="uk-width-expand uk-margin-small-left" >
          <a href="/" className="uk-display-inline-block" >
            <img src={`/logo.png`} alt="Logo" style={{ "maxHeight": "60px" }} />
          </a>
          <span className="uk-text-meta uk-margin-small-left uk-display-inline-block">
            α ver.
          </span>
        </div>
        <div className="uk-margin-small-right">
          { menu }
        </div>
      </header>
    );
  }
};

export default injectIntl(Header);
