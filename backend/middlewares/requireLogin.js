module.exports = (req, res, next)=>{
    if(!req.user)
        res.status(400).json({error:'you must login'});
    next();
}