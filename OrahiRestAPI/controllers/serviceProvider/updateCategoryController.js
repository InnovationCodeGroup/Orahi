var responses = require("../responses")();

var patchCategoryController = function () {
    var patch = function (req, res) {
        if (req.body._id)
            delete req.body._id;

        for (var p in req.body) {
            req.value[p] = req.body[p];
        }
        req.value.save(function (err) {
            if (err) {
                responses.failureInput(req, res, err);
            }
            else {
                responses.successfulInput(req, res, "Category has been updated");
            }
        });
    }
    return {
        patch: patch
    }
}

module.exports = patchCategoryController;

