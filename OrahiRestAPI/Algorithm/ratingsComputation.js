var ratingsComputation = function (value)
{
    var total = 0;
    var totalCount = 0;
    for ( i = 0; i < value.length; i++ )
    {
        var num = parseInt(value[i]._id.rating);
        var count = value[i].count;
        switch ( num )
        {
            case 5:
                total += num * count;
                totalCount += count;
                break;
            case 4:
                total += num * count;
                totalCount += count;
                break;
            case 3:
                total += num * count;
                totalCount += count;
                break;
            case 2:
                total += num * count;
                totalCount += count;
                break;
            case 1:
                total += num * count;
                totalCount += count;
                break;
        }
    }
    var result = ( total / totalCount ).toFixed( 2 );
    if ( result == NaN || result == '' ) result = 0;
    return result;
    
}

module.exports = ratingsComputation;
