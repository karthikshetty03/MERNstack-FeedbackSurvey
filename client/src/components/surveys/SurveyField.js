//SurveyField contains logic to render a single
//label and text input
import React from "react";

export default ({input, label}) => {
    
  return (
    <div>
        <label>{label}</label>
      <input {...input} />
    </div>
  );
};

//doing {...input} means onBlur = {input.onBlur} 
//onChange= {input.onChange} and so on 