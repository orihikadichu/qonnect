import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class QuestionTranslationList extends Component {
  constructor(props) {
    super(props);
    this.qId = this.props.qId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.qId);
  }

  getTranslationList() {
    
  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.questionTranslations;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const content = (
      <ul className="uk-list uk-list-divider uk-list-large" >
        {currentTranslationList.map(translation => (
          <li key={translation.id} >
            <article className="uk-comment">
              <div className="uk-comment-header uk-comment-body">
                <p style={{"whiteSpace": "pre-wrap"}} >
                  <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
                </p>
                <p className="uk-text-meta">{dayjs(translation.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>

              </div>
              <div className="uk-grid uk-grid-small uk-flex-middle" >
                <div className="uk-width-auto">
                  <img className="uk-comment-avatar uk-border-circle" src={translation.user.image_path} width="35" height="35" alt="" />
                </div>
                <div className="uk-width-expand">
                  <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${translation.user.id}`}>{ translation.user.name }</Link></h4>
                </div>
              </div>
            </article>
          </li>))}
      </ul>
    );

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default QuestionTranslationList;
