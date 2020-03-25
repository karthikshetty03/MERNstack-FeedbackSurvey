//SurveyForm shows a form to user to add input
import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import { Link} from 'react-router-dom';


const FIELDS = [
  { label: "Survey Title", name: "Title" },
  { label: "Subject", name: "subject" },
  { label: "Email Body", name: "Body" },
  { label: "Recipients List", name: "Emails" }
];

class SurveyForm extends React.Component {
  renderField() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          name={name}
          label={label}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderField()}
          <Link to="/surveys" className ="red btn-flat white-text" >
            Cancel
         </Link>
          <button className = "teal btn-flat right white-text" type="submit">
              Next
              <i className = "material-icons right" >done</i>
          </button>
           
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "SurveyForm"
})(SurveyForm);
