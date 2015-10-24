(function()
{
	CircuitViz.events.OutputEvent = function(type)
	{
		this.type = type;
	}
	var OutputEvent = CircuitViz.events.OutputEvent;
	OutputEvent.CHANGE_VALUE = "Change value";
	OutputEvent.CHANGE_SIGN = "Change sign";
})();