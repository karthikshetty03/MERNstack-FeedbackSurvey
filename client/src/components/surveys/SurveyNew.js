import React from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends React.Component {
  state =  {showFormReview : false} //babel functionality insted of writing a constructor

  renderContent() {
      if(this.state.showFormReview ) {
        return <SurveyFormReview/>
      }
    return <SurveyForm
    onSurveySubmit = {()=> this.setState({showFormReview : true})}
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
export default SurveyNew;
