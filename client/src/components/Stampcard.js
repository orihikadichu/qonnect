import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Stampcard extends Component {
  render() {
    const { voteArray, repeatNum } = this.props
    const tableContents =[];
    for (let i =0;i<repeatNum;i++){
        let voteList = voteArray.slice(i*5,i*5+5)
        let contents = voteList.map((e) => {
            // console.log(e.length === 0);
            if (e.length === 0) {
                return (
                    <td key={"vote_translate_td"+e.id}　className="uk-text-center"></td>
                );  
            }
            return (
                <td key={"vote_translate_td"+e.id}className="uk-text-center">
                    <Link to={e.user.profile_link}>
                    <img className="uk-comment-avatar uk-border-circle uk-margin-rigth-small" src={e.user.image_path} width="35" height="35" alt=""/>
                    </Link>
                </td>
            );
        });
        let rappedContents = <tr key={"vote_translate_tr"+i}>{ contents }</tr>
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