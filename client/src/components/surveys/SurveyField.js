//SurveyField contains logic to render a single
//label and text input
import React from "react";

export default ({input, label, meta : {error,touched}}) => {

  return (
    <div>
        <label><h5>{label}</h5></label>
      <input {...input} style = {{marginBottom : '5px'}} />
      <div style = {{marginBottom : '20px'}}>
      {touched && error}
      </div>
    </div>
  );
};

//doing {...input} means onBlur = {input.onBlur} 
//onChange= {input.onChange} and so on 