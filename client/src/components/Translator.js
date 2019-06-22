import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';

class Translator extends Component {

  render() {
    const { user } = this.props;
    const { name, image_path, profile_link } = user;
    const { formatMessage } = this.props.intl;
    const msg = formatMessage({id: "translated.name"});

    return (
      <div className="uk-text-right">
        <div className="uk-comment-meta uk-display-inline-block" style={{padding: '0 10px'}}>{ msg }</div>
        <div className="uk-display-inline-block">
          <Link to={profile_link}>
            <img className="uk-comment-avatar uk-border-circle uk-text-right" src={image_path} width="35" height="35" alt={name} />
          </Link>
        </div>
      </div>
    );
  }
}

export default injectIntl(Translator);
