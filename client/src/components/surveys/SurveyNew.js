import React from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import {reduxForm} from 'redux-form';



class SurveyNew extends React.Component {
  state =  {showFormReview : false} //babel functionality insted of writing a constructor

  renderContent() {
      if(this.state.showFormReview ) {
        return <SurveyFormReview
        onCancel = {() => this.setState({showFormReview : false})}
        />
      }
    return <SurveyForm
    onSurveySubmit = {( )=> this.setState({showFormReview : true})}
    />
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}
export default reduxForm ({
    form : "SurveyForm",
})(SurveyNew);


//if you toggle between the surveyFormReview and surveyNew then keep the values as it is
//but if the surveyNew is itselt unmounted then on again mounting it a new surveyForm will be displayed

