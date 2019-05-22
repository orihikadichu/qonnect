import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import TranslationForm from './TranslationForm';

class TranslationEdit extends Component {

  notOwnerWillTransfer(currentTranslation, loginUser) {
    const owner = currentTranslation.user;
    const { history } = this.props;
    if (owner.id !== loginUser.id) {
      return history.push('/');
    }
    return true;
  }

  render() {
    const { currentTranslation, handleSubmit, onClickDeleteBtn, loginUser } = this.props;

    if (Object.keys(currentTranslation).length === 0) {
      return (
        <div className="uk-position-center uk-overlay uk-overlay-default">
          <ClipLoader />
        </div>
      );
    }

    this.notOwnerWillTransfer(currentTranslation, loginUser);

    return (
      <main className="uk-container uk-container-small">
        <h2>翻訳の編集</h2>
        <TranslationForm initialValues={currentTranslation} onSubmit={handleSubmit} />
        <p><button className="uk-button uk-button-danger" onClick={onClickDeleteBtn}>この翻訳を削除</button></p>
        <Link to="/">Top</Link>
      </main>
    );
  }
}

export default TranslationEdit;
