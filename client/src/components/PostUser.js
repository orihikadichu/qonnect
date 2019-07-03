import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostUser extends Component {
  
    selectedNationalFlag(countryId) {
        let src;
        switch(countryId) {
            case 1:
                src = "japan";
                break;
            case 2:
                src = "usa";
                break;
            case 3:
                src = "philippines";
                break;
            case 4:
                src = "england";
                break;
            default :
                src = "japan";
                break;
        }
        return <img className="" src={`/image/common/flag/${src}.png`} style={{border: "1px solid #dcdcdc"}} width="20" height="20" alt=""/>;
    }

    render() {
        const { user } = this.props;
        const nationalFlag = this.selectedNationalFlag(user.country_id);
        const userName = user ? user.name : '不明なユーザー';
        const profileLink = `/users/profile/${user.id}`;

        return (
            <div className="uk-grid uk-grid-small uk-flex-middle" >
                <div className="uk-width-auto">
                    <Link to={profileLink}><img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="43" height="43" alt="" /></Link>
                </div>
                <div>
                <div className="uk-width-auto" >
                    { nationalFlag }
                </div>
                    <div>
                        <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={profileLink}>{ userName }</Link></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostUser;