var express = require('express');

/**
 * Start database models variables
 */
var CategoryModel = require('../../models/categoryModel');
var ServiceModel = require('../../models/serviceModel');
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

var categoryController = require('../../controllers/serviceProvider/deleteCategoryController')();

/**
 * End post Controllers variables
 */


/**
 * Start module main function
 */
var deleteRoutes = function (app) {
    var serviceProiderAuth = require('../../middleWare/serviceProviderAuth')(app);
    var updateServiceByCategory = require('../../middleWare/updateServiceBasedOnCategory')(ServiceModel);
    /**
     * Start routes
     */
    var router = express.Router();

    router.use(serviceProiderAuth.use);
    /**
     *Start applying middleware
     */
    router.use('/deleteCategory/:_Id', categoryMiddleWare.use);
    router.use('/deleteCategory/:_Id', updateServiceByCategory.update);
    /**
     *End applying middleware
     */
    router.route('/deleteCategory/:_Id')
        .delete(categoryController.del);

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = deleteRoutes;