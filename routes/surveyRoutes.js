const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");

const Survey = mongoose.model("Survey");

module.exports = app => {
  app.get('/api/surveys/thanks', (req,res)=> {
    res.send("thank You ! So much for voting");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title, //ES6
      subject,
      body,
      recipients: recipients
        .toString()
        .split(",")
        .map(email => ({ email: email.trim() })),
      dateSent: Date.now(),
      _user: req.user.id
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      console.log(survey);
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
//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
//we are not calling requireLogin so no set of parenthesis we only want to
//call when ther iss a request
