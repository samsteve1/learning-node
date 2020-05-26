module.exports = function (err, req, res, next) {

    let payload = {
        status: false,
        data: {
            error:{
                code: 500,
                message: "Something went wrong."
            }
        }
    }
    res.status(500).send(payload)
} 