(function()
{
	CircuitViz.digraph.Arc = function(src, rcv)
	{
		this.id = CircuitViz.digraph.Arc._nextId;
		CircuitViz.digraph.Arc._nextId++;
		this.srcVertex = src;
		this.rcvVertex = rcv;
		this._amperage;
	}
	var Arc = CircuitViz.digraph.Arc;
	
	Arc.prototype.getId = function()
	{
		return this.id;
	}

	Arc.prototype.reverse = function()
	{
		var tmp = srcVertex;
		this.srcVertex = this.rcvVertex;
		this.rcvVertex = tmp;
	}
		
	Arc.prototype.setAmperage = function(amp)
	{
		this._amperage = amp;
	}

	Arc.prototype.getAmperage = function()
	{
		return this._amperage;
	}
	
	Arc.prototype.toString = function()
	{
		return 'arc '+this.id;
	}
	
	Arc._nextId = 1;
	
})();