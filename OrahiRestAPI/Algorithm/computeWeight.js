var computeWeight = function(following, accept, mutual, individual, public, industrial){
	return ((following * 0.13)+(accept * 0.2)+(mutual * 0.3)+(individual * 0.25)+(public * 0.07)+(industrial * 0.05))
}

module.exports = computeWeight;