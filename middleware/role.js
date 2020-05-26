const _ = require('lodash')

const admin = function (req, res, next) {
    if(!_.includes(req.user.roles, 'admin')){
        let payload = {
            status: false,
            data: {
                error:{
                    code: 403,
                    message: "Unathorized."
                }
            }
        }
        return res.status(403).send(payload)
    }
    next();
}
module.exports.admin  = admin