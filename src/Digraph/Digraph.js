(function()
{
	CircuitViz.digraph.Digraph = function()
	{
		this.listOfVertex = {};
		this.listOfArcs = {};
	}
	
	var Digraph = CircuitViz.digraph.Digraph;
	
	Digraph.prototype.addVertex = function()
	{
		var vertex = new CircuitViz.digraph.Vertex();
		this.listOfVertex[vertex.toString()] = vertex;
		return vertex;
	}
	Digraph.prototype.addArc = function(v1,v2)
	{
		var arc = new CircuitViz.digraph.Arc(v1,v2);
		this.listOfArcs[arc.toString()] = arc;
		v1.addArc(arc);
		v2.addArc(arc);
		return arc;
	}
	Digraph.prototype.removeVertex = function(obj)
	{
		if(typeof(obj) == 'number')
		{
			var vertex;
			for(var i in listOfVertex)
			{
				vertex = listOfVertex[i];
				if(vertex.getId() == obj)
				{
					for(var j in vertex.listOfArcs)
						this.removeArc(vertex.listOfArcs[j]);
					delete this.listOfVertex[vertex.toString()];
					vertex = null;
					break;
				}
			}
		}
		else
		if(obj instanceof CircuitViz.digraph.Vertex)
		{
			var arc;
			for(var j in obj.listOfArcs)
				this.removeArc(obj.listOfArcs[j]);
			delete this.listOfVertex[obj.toString()];
		}
	}
	Digraph.prototype.removeArc = function(obj)
	{
		var arc;
		var src;
		var rcv;
		if(obj instanceof CircuitViz.digraph.Arc)
		{
			arc = obj;
			src = arc.srcVertex;
			rcv = arc.rcvVertex;
			delete src.listOfArcs[arc.toString()];
			delete rcv.listOfArcs[arc.toString()];
			delete this.listOfArcs[arc.toString()];
		}
		else
		if(typeof(obj) == 'number')
		{
			for(var i in this.listOfArcs)
				if(this.listOfArcs[i].getId() == obj)
				{
					arc = this.listOfArcs[i];
					break;
				}
			src = arc.srcVertex;
			rcv = arc.rcvVertex;
			delete src.listOfArcs[arc.toString()];
			delete rcv.listOfArcs[arc.toString()];
			delete this.listOfArcs[arc.toString()];
		}
	}
	Digraph.prototype.connectToArc = function(begin, end)
	{
		begin.rcvVertex = end.srcVertex;
	}
	
})();

