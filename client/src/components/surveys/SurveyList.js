import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends React.Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
         <div className ="card blue-grey white-text darken-1" key = {survey._id}>
             <div className = "card-content">
                 <span className = "card-title">{survey.title}</span>
                 <p>
                     {survey.body}
                 </p>
                 <p className="right">
                    Sent On : {new Date(survey.dateSent).toLocaleDateString()}
                 </p>
             </div>
             <div className="card-action">
                 <a>YES : {survey.yes} </a>
                 <a>NO : {survey.no} </a>
             </div>

         </div>
      );
    });
  }

  render() {
    console.log("surveys : ",this.props.surveys);
    return (
      <div>
          {this.renderSurveys()}
          
      </div>
    );
  }
}

function mapStateToProps(state) {

  return { surveys : state.surveys};
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
