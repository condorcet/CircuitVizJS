(function()
{
	CircuitViz.digraph.Vertex = function()
	{
		this.id = CircuitViz.digraph.Vertex._nextId;
		CircuitViz.digraph.Vertex._nextId++;
		this.listOfArcs = [];
		
	}
	var Vertex = CircuitViz.digraph.Vertex;
	
	Vertex.prototype.getId = function()
	{
		return this.id;
	}
	
	Vertex.prototype.addArc = function(arc)
	{
		this.listOfArcs[arc.toString()] = arc;
	}
	
	Vertex.prototype.toString = function()
	{
		return 'vertex '+this.id;
	}
	
	Vertex._nextId = 1;
	
})();