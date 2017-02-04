var responses = require("../responses")();

var getController = function (Value) {
    var values;
    var get = function (req, res) {

        var query = {};
        if (req.query.serviceProvider) {
            query.serviceProvider = req.query.serviceProvider;
        }
        Value.find(query, function (err, results) {
            if (err) {
                responses.failureOutput(req, res, err);
            }
            else
                responses.successfulOutput(req, res, results);
        });

       

    }

    return {
        get: get
    }
}

module.exports = getController;