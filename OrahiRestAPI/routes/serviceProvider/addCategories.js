var express = require('express');

/**
 * Start database models variables
 */
var CategoryModel = require('../../models/categoryModel');
/**
 *End database models variables
 */

/**
 * Start post Controllers variables based on the various models in the database
 */

var categoryController = require('../../controllers/serviceProvider/postCategoryController')(CategoryModel);

/**
 * End post Controllers variables
 */

/**
 * Start module main function
 */
var postCategory = function (app) {

    var serviceProiderAuth = require('../../middleWare/serviceProviderAuth')(app);

    /**
     * Start routes
     */
    var router = express.Router();

    router.use(serviceProiderAuth.use);

    router.route('/addCategory')
        .post(categoryController.post);

    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = postCategory;