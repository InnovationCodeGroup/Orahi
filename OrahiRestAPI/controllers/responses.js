var responses = function () {

    var successfulLogin = function (req, res, message, user, token) {
        var message = { status: "success", message: message, user: user, token: token };
        res.status(201);
        res.json(message);
    }

    var successfulLoginSP = function (req, res, message, serviceprovider, token) {
        var message = { status: "success", message: message, serviceprovider: serviceprovider, token: token };
        res.status(201);
        res.json(message);
    }

    var successfulInput = function (req, res, message) {
        var message = { status: "success", message: message };
        res.status(201);
        res.json(message);
    }

    var failureInput = function (req, res, message) {
        var message = { status: "failure", message: message };
        res.status(500);
        res.json(message);
    }

    var failureOutput = function (req, res, message) {
        var message = { status: "failure", message: message };
        res.status(500);
        res.json(message);
    }

    var successfulOutput = function (req, res, value) {
        res.status(200);
        res.jsonp(value);
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
        res.json(message);
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
        res.json(message);
    }

    var successfulGetImage = function (res, ext, data) {
        if (ext === '.png') res.writeHead(200, { 'Content-Type': 'image/png' });
        if (ext === '.jpg') res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(data, 'binary');
    }

    var failureGetImage = function (req, res, err) {
        var message;
        if (err.code === "ENOENT") {
            res.status(404);
            var message = { success: "failure", message: "No such file or directory" };
        } else {
            res.status(400);
            var message = {
                success: "failure", message: err
            };
        }

        res.json(message);
    }

    return {
        successfulLogin: successfulLogin,
        successfulLoginSP: successfulLoginSP,
        successfulInput: successfulInput,
        successfulOutput: successfulOutput,
        failureInput: failureInput,
        failureOutput: failureOutput,
        consoleSuccess: consoleSuccess,
        consoleFailure: consoleFailure,
        dataConflict: dataConflict,
        authenticationFailed: authenticationFailed,
        authenticationApproved: authenticationApproved,
        successfulGetImage: successfulGetImage,
        failureGetImage: failureGetImage
    }

}

module.exports = responses;