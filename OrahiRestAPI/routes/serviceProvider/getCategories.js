﻿var express = require('express');

/**
 * Start database models variables
 */
var CategoryModel = require('../../models/categoryModel');

/**
 *End database models variables
 */

/**
 * Start get Controllers variables based on the various models in the database
 */
var CategoryController = require('../../controllers/serviceProvider/getCategoriesController')(CategoryModel);


/**
 * End get Controllers variables
 */

/**
 * Start module main function
 */
var getRoutes = function (app) {
    var serviceProiderAuth = require('../../middleWare/serviceProviderAuth')(app);
    /**
     * Start routes
     */
    var router = express.Router();

    router.use(serviceProiderAuth.use);

    router.route('/getCategories')
        .get(CategoryController.get);


    /**
      * End routes
      */

    return router;
}

/**
 * End module main function
 */
module.exports = getRoutes;