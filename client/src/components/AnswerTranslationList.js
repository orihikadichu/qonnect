import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

class AnswerTranslationList extends Component {
  constructor(props) {
    super(props);
    this.aId = this.props.aId;
  }

  componentWillMount() {
    this.props.handleFetchData(this.aId);
  }

  getTranslationList(translationList, loginUser) {
    return (
      <ul className="uk-list uk-list-divider uk-list-large" >
        {translationList.map(translation => {
           const editLink = translation.user.id === loginUser.id
                          ? <Link to={`/answer_translations/edit/${translation.id}`}>編集</Link>
                          : '';

           return (
             <li key={translation.id} >
               <article className="uk-comment">
                 <div className="uk-comment-header uk-comment-body">
                   <p style={{"whiteSpace": "pre-wrap"}} >
                     <Linkify properties={{ target: '_blank'}} >{translation.content}</Linkify>
                     { editLink }
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
             </li>
           );
        })}
      </ul>
    );

  }

  render() {
    const { isFetching, currentTranslationList } = this.props.state.answerTranslations;
    const loginUser = this.props.state.auth.user;

    if (isFetching) {
      return (<ClipLoader />);
    }

    const content = this.getTranslationList(currentTranslationList, loginUser);


    return (
      <div>
        {content}
      </div>
    );
  }
}

export default AnswerTranslationList;
