const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

const Survey = mongoose.model("Survey");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    if(req.body.recipients) {
      const survey = new Survey({
        title, //ES6
        subject,
        body,
        recipients: recipients.toString().split(',').map(email => ({ email: email.trim() })), 
        dateSent : Date.now(),
        _user : req.user.id,
    });

      if(survey.recipients)
      {
        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
        console.log(survey);
      }
    }
  });
};
//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
//we are not calling requireLogin so no set of parenthesis we only want to 
//call when ther iss a request