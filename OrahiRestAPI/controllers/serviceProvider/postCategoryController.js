var responses = require("../responses")();

var postCategoryController = function (Value) {
    var post = function (req, res) {

        var value = new Value(req.body);
        value.serviceProvider = req.decoded._doc._id;

        value.save(function (err) {
            if (err) {
                responses.failureInput(req, res, err);
            }
            else {
                responses.successfulInput(req, res, "Category has been inserted");
            }
        })

    }

    return {
        post: post
    }
}

module.exports = postCategoryController;