import React from 'react';
/* import MenuDrawer from '../../containers/layouts/MenuDrawer';*/
import MenuDrawer from './MenuDrawer';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  state = {
    anchorEl: null
  };

  onClickLogout() {
    const { user } = this.props.state.auth;
    if (!user.id) {
      return '';
    }
    const { history } = this.props;
    const actionData = { history };
    return this.props.logout(actionData);
  }

  getMenu = (displayName) => {
    const { anchorEl } = this.state;

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
          text: "プロフィールページ",
          to: `/users/profile/${user.id}`,
          icon: "user"
        },
        {
          text: "プロフィール編集",
          to: '/users/profile_edit',
          icon: "pencil",
        },
        {
          text: "新規登録",
          to: '/users/signup',
          icon: "check",
        }
      ];
      return menuList.map((v, i) => (
        <MenuItem key={i} onClick={handleClose}>
          <Link to={v.to} >
            <span uk-icon={v.icon} ></span>
            <span>{v.text}</span>
          </Link>
        </MenuItem>
      ));
    };

    const getLoginElem = (auth) => {
      return (auth.isLoggedIn)
           ? (
             <MenuItem onClick={handleLogout.bind(this)}>
               <Link to="" >
                 <span uk-icon="sign-out" ></span>
                 <span>ログアウト</span>
               </Link>
             </MenuItem>
           )
           : (
             <MenuItem onClick={handleClose}>
               <Link to="/users/login" >
                 <span uk-icon="sign-in" ></span>
                 <span>ログイン</span>
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
        </Menu>
      </div>
    );
  }

  render() {
    const { user } = this.props.state.auth;
    const imagePath = user.image_path ? user.image_path : '/image/blank-profile.png';
    const displayMenuElem = <img src={imagePath} className="uk-border-circle" width="50" height="50" alt="" />;
    const menu = this.getMenu(displayMenuElem);

    return (
      <header className="uk-margin-bottom uk-heading-divider uk-grid" >
        <div className="uk-width-expand@s uk-margin-small-left" >
          {/*
              <Link to="/" className="uk-display-inline-block" >
              </Link>
            */}
          <a href="/" className="uk-display-inline-block" >
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ height: "70px" }} />
          </a>
        </div>
        <div className="uk-margin-small-right">
          { menu }
        </div>
      </header>
    );
  }
};

export default Header;
