const mongoose = require('mongoose');

function validateObjId(req, res, next) {
    let objectId = mongoose.Types.ObjectId;
    if(!objectId.isValid(req.params.id)) return res.status(400).send('invalid Id');
    next();
}

module.exports = validateObjId;