(function()
{
	var VisualError = CircuitViz.visualization.VisualError;
	var OutputEvent = CircuitViz.events.OutputEvent;
	var Chain = CircuitViz.visualization.Chain;
	var Segment = CircuitViz.visualization.Segment;
	var EventDispatcher = CircuitViz.events.EventDispatcher;
	CircuitViz.visualization.Visualization = function(graph)
	{
		createjs.Container.apply(this, arguments);
		this._deltaDistance = 20;
		this._listOfChains = {};
		this._listOfChanged = [];
		this._digraph;
		this._arcs = [];
		this._baseAmperage = 0.05;
		this._visualState = CircuitViz.visualization.Visualization.VISUAL_NONE;
		this.setDigraph(graph);
	}
	
	var Visualization = CircuitViz.visualization.Visualization;
	Visualization.prototype = Object.create(createjs.Container.prototype);
	Visualization.prototype.constructor = Visualization;
	
	Visualization.prototype.setDigraph = function(graph)
	{
		if(this._visualState != Visualization.VISUAL_NONE)
			throw new VisualError('Cannot set digraph after start visual');
		if(graph)
		{
			this._digraph = graph;
			this._addListeners();
		}
	}
	
	Visualization.prototype.addChain = function(arc, listOfPoints)
	{
		if(this._visualState !=  Visualization.VISUAL_NONE)
			throw new VisualError('Cannot add chain after start visual');
		if(!arc || !listOfPoints || listOfPoints.length < 2)
			return;
		var chain = new Chain();
		var segment;
		for(var i=0; i<listOfPoints.length-1; i++)
		{
			segment = new Segment(listOfPoints[i], listOfPoints[i+1]);
			chain.addSegment(segment);
			chain.setDeltaDistance(this._deltaDistance);
		}
		this._arcs[arc] = arc;
		this._listOfChains[arc] = chain;
		chain.createParticles();
		this.addChild(chain);
	}
	
	Visualization.prototype.clear = function()
	{
		for(;this.numChildren > 0;)
			this.removeChildAt(0);
		this._removeListeners();
		this._digraph = null;
		this._listOfChanged = null;
		this._listOfChains = null;
		this._visualState = Visualization.VISUAL_NONE;
	}
	
	Visualization.prototype.update = function(force)
	{
		if(this._visualState == Visualization.VISUAL_NONE)
			throw new VisualError('Vis not started yet');
		if(this._visualState == Visualization.VISUAL_STOPPED || this._visualState == Visualization.VISUAL_ERROR)
			return;
		if(force == true)
		{
			for(var key in this._listOfChains)
			{
				var output = this._arcs[key].getAmperage();
				if(Math.abs(output.getValue()) >= this._baseAmperage)
					console.log('warning: strobe effect on arc '+key);
				this._listOfChains[key].setSpeed(output.getValue()/this._baseAmperage*this._deltaDistance/2);
			}
		}
		else
		{
			for(var i=0; i< this._listOfChanged.length; i++)
			{
				for(var key in this._listOfChains)
				{
					var output = this._arcs[key].getAmperage();
					if(Math.abs(output.getValue()) >= this._baseAmperage)
						console.log('warning: strobe effect on arc '+key);
					if(output == this._listOfChanged[i])
						this._listOfChains[key].setSpeed(output.getValue()/this._baseAmperage*this._deltaDistance/2);
				}
			}
			this._listOfChanged = [];
		}
	}
	
	Visualization.prototype.start = function()
	{
		if(this._visualState != Visualization.VISUAL_NONE)
			return;
		this._visualState = Visualization.VISUAL_STARTED;
		createjs.Ticker.addEventListener('tick', animate(this));
	}
	Visualization.prototype.pause = function()
	{
		if(this._visualState == Visualization.VISUAL_NONE)
			throw new VisualError('Vis not started yet');
		if(this._visualState != Visualization.VISUAL_STARTED)
			return;
		createjs.Ticker.removeEventListener('tick', animate(this));
		this._visualState = Visualization.VISUAL_PAUSED;
	}
	Visualization.prototype.resume = function()
	{
		if(this._visualState != Visualization.VISUAL_PAUSED)
			return;
		this._visualState = Visualization.VISUAL_STARTED;
		createjs.Ticker.addEventListener('tick', animate(this));
	}
	Visualization.prototype.stop = function()
	{
		if(this._visualState == Visualization.VISUAL_NONE)
			throw new VisualError('Vis not started yet');
		createjs.Ticker.removeEventListener('tick', animate(this));
		this._visualState = Visualization.VISUAL_STOPPED;
	}
	function animate(context)
	{
		return (function(e)
		{
			for(var key in context._listOfChains)
				context._listOfChains[key].nextStep();
		});
	}
	Visualization.prototype._animate = function(e)
	{
		for(var key in this._listOfChains)
			this._listOfChains[key].nextStep();
	}
	Visualization.prototype._addListeners = function()
	{
		var output;
		for(var i in this._digraph.listOfArcs)
		{
			output = this._digraph.listOfArcs[i].getAmperage();
			output.addEventListener(OutputEvent.CHANGE_VALUE, listenerValue(this));
		}
	}
	
	function listenerValue(context)
	{
		return (
			function(e,key)
			{
				context._listOfChanged.push(e.target);
				context.update(); //сделать по-умному!
			});
	}
	
	Visualization.prototype._listenerValue = function(e)
	{
		this._listOfChanged.push(e.target);
	}
	Visualization.prototype._removeListeners = function()
	{
		for(var output in this._digraph.listOfArcs)
			output.removeListener(OutputEvent.CHANGE_VALUE, listenerValue);
	}
	Visualization.prototype.setBaseAmperage = function(amp)
	{
		this._baseAmperage = amp;
		if(this._visualState != Visualization.VISUAL_NONE)
			this.update(true);
	}
	Visualization.prototype.setDeltaDistance = function(dist)
	{
		if(this._visualState == Visualization.VISUAL_NONE)
			this._deltaDistance = dist;
		else
			throw new VisualError('Cannot set delta distance after start visusalization');
	}
	
	Visualization.VISUAL_NONE = 'none';
	Visualization.VISUAL_STARTED = 'Started';
	Visualization.VISUAL_STOPPED = 'Stopped';
	Visualization.VISUAL_PAUSED = 'Paused';
	Visualization.VISUAL_ERROR = 'Error';
	
	for(var key in EventDispatcher)
	{
		Visualization.prototype[key] = EventDispatcher[key];
	}
	
	
})();