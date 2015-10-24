(function()
{
	CircuitViz.model.Output = function(name)
	{
		if(!name)
			this.name = name;
		this._value;
	}
	
	var Output = CircuitViz.model.Output;
	var EventDispatcher = CircuitViz.events.EventDispatcher;
	var OutputEvent = CircuitViz.events.OutputEvent;
	
	Output.prototype.setValue = function(value)
	{
		if(this._value != value)
		{
			this._value = value;
			var e = new OutputEvent(OutputEvent.CHANGE_VALUE);
			this.dispatchEvent(e);
		}
	}
	Output.prototype.getValue = function()
	{
		return this._value;
	}
	for(var key in EventDispatcher)
	{
		Output.prototype[key] = EventDispatcher[key];
	}
	
})();