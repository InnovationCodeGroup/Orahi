'use strict';

var randtoken = require( 'rand-token' ),
    nodemailer = require( 'nodemailer' ),
    mongoose = require( 'mongoose' );


var emailVerification = function ( moongoose )
{
    var isPositiveInteger = function ( x )
    {
        return ( ( parseInt( x, 10 ) === x ) && ( x >= 0 ) );
    };

    var createOptionError = function ( optionName, optionValue, expectedType )
    {
        return new TypeError( 'Expected ' + optionName + ' to be a ' + expectedType + ', got ' +
            typeof optionValue );
    };

    /**
   * Retrieve a nested value of an object given a string, using dot notation.
   *
   * @func getNestedValue
   * @param {object} obj - object to retrieve the value from
   * @param {string} path - path to value
   * @param {string} def - default value to return if not found
   */
    var getNestedValue = function ( obj, path, def )
    {
        path = path.split( '.' );
        for ( let i = 0, len = path.length; i < len; i++ )
        {
            if ( !obj || typeof obj !== 'object' )
            {
                return def;
            }
            obj = obj[path[i]];
        }

        if ( obj === undefined )
        {
            return def;
        }
        return obj;
    };


    /**
   * Create a Mongoose Model for the temporary user, based off of the persistent
   * User model, i.e. the temporary user inherits the persistent user. An
   * additional field for the URL is created, as well as a TTL.
   *
   * @func generateTempUserModel
   * @param {object} User - the persistent User model.
   * @return {object} the temporary user model
   */

    var generateTempUserModel = function ( User, callback )
    {
        if ( !User )
        {
            return callback( new TypeError( 'Persistent user model undefined' ), null );
        }

        var tempUserSchemaObject = {}, //a copy of the schema
            tempUserSchema;

        //copy of the attributes of the schema
        Object.keys( User.schema.methods ).forEach( function ( meth )
        {
            tempUserSchema.methods[meth] = User.schema.methods[meth];
        });
        options.tempUserModel
    }
}
module.exports = emailVerification;