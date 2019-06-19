import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import AnswerTranslationForm from '../components/AnswerTranslationForm';
import AnswerTranslationList from '../containers/AnswerTranslationList';
import {
  fetchAnswer,
  fetchAnswerList
} from '../actions/Answer';
import {
  postAnswerTranslationData
} from '../actions/AnswerTranslation';
import { isEmptyObject } from '../utils';
import { injectIntl } from 'react-intl';


class AnswerTranslationView extends Component {
  constructor(props) {
    super(props);
    const {params} = props.match;
    this.aId = parseInt(params.answer_id, 10);
  }

  componentWillMount() {
    this.props.getAnswerById(this.aId);
  }

  handleSubmit(formData) {
    try {
      const { content, translate_language_id } = formData;
      if (content === '') {
        const msg = '空文字で投稿はできません。';
        throw new Error(msg);
      }
      const { user } = this.props.state.auth;
      const answer_id = this.aId;
      const user_id = user.id;
      return this.props.handleSubmit({content, answer_id, user_id, translate_language_id});
    } catch (e) {
      console.log('e', e.message);
      return;
    }
  }

  selectedNationalFlag(countryId){
    switch(countryId){
      case 1:
        return <img src="/image/common/flag/japan.png" width="25" height="25" alt=""/>;
      case 2:
        return <img className="uk-border" src="/image/common/flag/america.png" width="25" height="25" alt=""/>;
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { currentAnswer } = this.props.state.answers;
    if (isEmptyObject(currentAnswer)) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    const user = (currentAnswer.user) ? currentAnswer.user : null;
    const userName = (user) ? user.name : '';
    const { question_id } = currentAnswer;
    const nationalFlag = this.selectedNationalFlag(user.country_id);

    return (
      <main className="uk-container uk-container-small">
        <div className="uk-card uk-card-default uk-card-body uk-box-shadow-small">
          <p><Linkify properties={{ target: '_blank'}} >{currentAnswer.content}</Linkify></p>
          <p className="uk-text-meta">{dayjs(currentAnswer.created_at).format('YYYY/MM/DD HH:mm:ss')}</p>
          <div className="uk-grid uk-grid-small uk-flex-middle" >
            <div className="uk-width-auto">
              <img className="uk-comment-avatar uk-border-circle" src={user.image_path} width="35" height="35" alt="" />
            </div>
            <div>
              <h4 className="uk-comment-meta uk-margin-remove"><Link className="" to={`/users/profile/${user.id}`}>{ userName }</Link></h4>
            </div>
            <div className="uk-width-expand" >
              { nationalFlag }
            </div>
          </div>

        </div>
        <h3 className="uk-heading-line"><span>{formatMessage({id: "titles.translation_list"})}</span></h3>
        <AnswerTranslationForm aId={this.aId} onSubmit={this.handleSubmit.bind(this)} />
        <AnswerTranslationList aId={this.aId} />
        <hr className="uk-divider-icon" />
        <p><Link to={`/questions/${question_id}`}>{formatMessage({id: "links.to_question_view"})}</Link></p>
        <p><Link to="/">Top</Link></p>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {state};
};

const mapDispatchToProps = dispatch => {
  return {
    getAnswerById: (id) => dispatch(fetchAnswer(id)),
    fetchAnswers: (question_id) => dispatch(fetchAnswerList(question_id)),
    handleSubmit: (postData) => dispatch(postAnswerTranslationData(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AnswerTranslationView));
