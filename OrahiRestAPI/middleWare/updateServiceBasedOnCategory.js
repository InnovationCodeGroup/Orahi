var responses = require("../controllers/responses")();

var updateServiceBasedOnCategory = function (Value) {
    var numberServices = 0;
    var update = function (req, res, next) {

        if (req.query.del === "services") {
            Value.find({ category: req.value._id }).remove().exec(function (err, numAffected) {
                if (err) {
                    responses.failureInput(req, res, err);
                } else {
                    responses.consoleSuccess(numAffected);
                    next();
                }
            });
        } else {
            Value.update({ category: req.value._id }, {
                $unset: { category: "" },
                $set: {
                    inCategory: false
                }
            }, { multi: true },
                function (err, numAffected) {
                    if (err) {
                        responses.failureInput(req, res, err);
                    } else {
                        responses.consoleSuccess(numAffected);
                        next();
                    }
                });
        }

    }

    return {
        update: update
    }
}

module.exports = updateServiceBasedOnCategory;
