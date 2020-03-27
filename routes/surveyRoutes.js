const _ = require("lodash");
const Path = require("path-parser");
// const Path = require('path-parser').default;
// const {Path} = require('path-parser');
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");

const Survey = mongoose.model("Survey");

module.exports = app => {
  app.get("/api/surveys/", requireLogin, async (req, res) => {
    //current user is available on the req object
    const surveys = await Survey.find({ _user: req.user.id })
    .select({recipients : false});
    res.send(surveys);
  });

  // const p = new Path("/api/surveys/:surveyId/:choice");
  // app.post("/api/surveys/webhooks", (req, res) => {
  //   const events = _.map(req.body, ({email, url}) => {
  //   const match = p.test(new URL(url).pathname);

  //     if (match) {
  //       return {email,surveyId : match.surveyId,choice:match.choice};
  //     }
  //   });
  //   // console.log(events);
  //   const compactEvents = _.compact(events);
  //   const uniqueEvents =  _.uniqBy(compactEvents, 'email', 'surveyId');
  //   console.log(uniqueEvents);
  // });

  //refactored the code using lodash functions

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("thank You ! So much for voting");
  });
  const p = new Path("/api/surveys/:surveyId/:choice");
  app.post("/api/surveys/webhooks", (req, res) => {
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();

        //es6 key interpolation
        //this is type of query is writtnen so that we fetch only the required data and
        //there is no need for the data to come to express server and the apply operations
      })
      .value();

    //we first gonna iterate over req.body
    //we gonna map it
    //we then compact it
    //we then gonna do uniqueness check
    //then gonna apply some operations on the database
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
