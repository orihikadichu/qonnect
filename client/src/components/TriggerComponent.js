import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import styles from './component.css'

class TriggerComponent extends Component {  
  render () {
    const {questionId, questionDispText} = this.props;
    return (
        <p className="uk-text-lead uk-text-truncate" >
            <Link to={`/questions/${questionId}`}>{`${questionDispText}`}</Link>
        </p>
    )
  }
}

export default TriggerComponent;