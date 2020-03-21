//lower csse r means export a func
//otherwise a class if uppercase

module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({error : 'You must log in !'}); 
    }
next();

}

