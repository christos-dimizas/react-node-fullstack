/**
 *
 */

module.exports = (req, res, next) => {
    // if no credits found
    if(req.user.credits < 1){
        return res.status(403).send({error: 'Not enough cedits'});
    }
    // else
    next();
};

