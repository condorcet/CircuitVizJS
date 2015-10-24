(function()
{
	CircuitViz.events.BaseModelEvent = function(type)
	{
		this.type = type;
	}
	var BaseModelEvent = CircuitViz.events.BaseModelEvent;
	BaseModelEvent.CHANGE_VALUE = "Change value";
	BaseModelEvent.CHANGE_SIGN = "Change sign";
})();