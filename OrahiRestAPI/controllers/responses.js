var responses = function () {
    var successfulInput = function (req, res, message) {
        var message = { status: "success", message: message };
        res.status(201);
        if (req.query.device === "WEB") {
            res.jsonp(message);
        } else {
            res.json(message);
        }
    }

    var failureInput = function (req, res, message) {
        var message = { status: "failure", message: message };
        res.status(500);
        if (req.query.device === "WEB") {
            res.jsonp(message);
        } else {
            res.json(message);
        }
    }

    var failureOutput = function (req, res, message) {
        var message = { status: "failure", message: message };
        res.status(500);
        if (req.query.device === "WEB") {
            res.jsonp(message);
        } else {
            res.json(message);
        }
    }

    var successfulOutput = function (req, res, value) {
        res.status(200);
        if (req.query.device === "WEB") {
            res.jsonp(value);
        } else {
            res.json(value);
        }
    }

    var consoleFailure = function (message) {
        var message = JSON.stringify({ status: "failure", message: message });
        console.log(message);
    }

    var consoleSuccess = function (message) {
        var message = JSON.stringify({ status: "success", message: message });
        console.log(message);
    }

    var dataConflict = function (req, res, message) {
        var message = { status: "failure", message: message }
        res.status(409);
        if (req.query.device === "WEB") {
            res.jsonp(message);
        } else {
            res.json(message);
        }
    }

    var authenticationFailed = function (req, res, message) {
        var message = { status: "failure", message: message }
        res.status(401);
        if (req.query.device === "WEB") {
            res.jsonp(message);
        } else {
            res.json(message);
        }
    }

    var authenticationApproved = function (req, res, message, token) {
        var message = { status: "success", message: message, token: token }
        res.status(201);
        if (req.query.device === "WEB") {
            res.jsonp(message);
        } else {
            res.json(message);
        }
    }

    return {
        successfulInput: successfulInput,
        successfulOutput: successfulOutput,
        failureInput: failureInput,
        failureOutput: failureOutput,
        consoleSuccess: consoleSuccess,
        consoleFailure: consoleFailure,
        dataConflict: dataConflict,
        authenticationFailed: authenticationFailed,
        authenticationApproved: authenticationApproved
    }

}

module.exports = responses;