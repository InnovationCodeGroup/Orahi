var express = require('express');
/**
 * Start database models variables
 */
var ServiceProviderModel = require('../../models/serviceProviderModel');
/**
 *End database models variables
 */

/**
 * Start delete MiddleWare variables based on the various models in the database
 */
var spMiddleWare = require('../../middleWare/findByIdMiddleWare')(ServiceProviderModel);
/**
 * End delete MiddleWare variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var spController = require('../../controllers/user/getSPByIdController')();

/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function (app) {
    var userAuth = require('../../middleWare/userAuth')(app);
    /**
     * Start routes
     */
    var router = express.Router();

    router.use(userAuth.use);
    /**
     *Start applying middleware
     */
    router.use('/getServiceProvider/:_Id', spMiddleWare.use);

    /**
     *End applying middleware
     */
    router.route('/getServiceProvider/:_Id')
        .get(spController.get);

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;