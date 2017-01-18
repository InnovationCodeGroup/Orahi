var express = require('express');

/**
 * Start database models variables
 */
var CategoryModel = require('../../models/categoryModel');
/**
 *End database models variables
 */

/**
 * Start delete MiddleWare variables based on the various models in the database
 */
var categoryMiddleWare = require('../../middleWare/findByIdMiddleWare')(CategoryModel);
/**
 * End delete MiddleWare variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var categoryController = require('../../controllers/serviceProvider/updateCategoryController')();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var patchRoutes = function (app, imageDir) {

    var serviceProiderAuth = require('../../middleWare/serviceProviderAuth')(app);
    /**
     * Start routes
     */
    var router = express.Router();

    router.use(serviceProiderAuth.use);
    /**
     *Start applying middleware
     */
    router.use('/updateCategory/:_Id', categoryMiddleWare.use);

    /**
     *End applying middleware
     */
    router.route('/updateCategory/:_Id')
        .patch(categoryController.patch);

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = patchRoutes;