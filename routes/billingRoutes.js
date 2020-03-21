const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin  = require('../middlewares/requireLogin');

module.exports = app => {

  app.post("/api/stripe", requireLogin, async (req, res, next) => {
    if(!req.user) {
      return res.status(401).send({error : 'You must log in'});
    }
    try {
      
      const charge = await stripe.charges.create({
        source: "terekokyakarnahai",
        amount: 500,
        currency: "inr",
        description: "$5 for 5 credits",
        source: req.body.id
      });

      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      console.log(req.body.id);
      next("ERROR HAI BHAI : " + err);
    }
  });
};
// the require login concept is that take the request and throw it into the midldeware if the user is logged in proceed otherwise send a error reqponse
