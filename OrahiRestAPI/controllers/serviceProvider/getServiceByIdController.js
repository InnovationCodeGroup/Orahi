var getByIdController = function ()
{

    var get = function ( req, res )
    {
        res.json( req.value );
    }

    return {
        get: get
    }
}

module.exports = getByIdController;