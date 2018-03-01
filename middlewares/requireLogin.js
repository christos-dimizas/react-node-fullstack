
module.exports= (req, res, next) => {
    // If no user found then stop
    if(!req.user) {
        return res.status(401).send({error: 'You must log in first'});
    }
    // else continue
    next();
};