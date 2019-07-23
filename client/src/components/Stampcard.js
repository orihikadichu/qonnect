import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Stampcard extends Component {
  render() {
    const { voteArray, stampCardRowNum } = this.props
    const tableContents = [];
    const columnNum = 5;
    for (let i = 0; i < stampCardRowNum; i++) {
        const voteList = voteArray.slice(i * columnNum, (i + 1) * columnNum);
        const contents = voteList.map((e, key) => {
            if (e.length === 0) {
                return (
                    <td key={`vote_translate_empty_td${key}`}　className="uk-text-center"></td>
                );  
            }
            return (
                <td key={`vote_translate_td${e.id}`}className="uk-text-center">
                    <Link to={e.profile_link}>
                        <img className="uk-comment-avatar uk-border-circle uk-margin-rigth-small" src={e.image_path} width="35" height="35" alt=""/>
                    </Link>
                </td>
            );
        });
        const rappedContents = <tr key={`vote_translate_tr_${i}`}>{ contents }</tr>
        tableContents.push(rappedContents);
    }

    return (
        <table className="uk-table stamp-card uk-card uk-card-default uk-card-small uk-card-body uk-margin-top">
            <tbody>
                {tableContents}
            </tbody>
        </table>
    );

   };
};
      
export default Stampcard;