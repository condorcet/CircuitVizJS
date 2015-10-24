(function()
{
	var Output = CircuitViz.model.Output;
	var OutputEvent = CircuitViz.events.OutputEvent;
	var BaseModelEvent = CircuitViz.events.BaseModelEvent;
	CircuitViz.model.BaseModel = function()
	{
		this.time = new Output();
		this._listOfOutputs = {};
		this._listOfChangedValue = [];
		this._listOfChangedSign = [];
	}
	var BaseModel = CircuitViz.model.BaseModel;
	BaseModel.prototype.addOutput = function(output)
	{
		if(this._listOfOutputs[output])
			return;
		output.addEventListener(OutputEvent.CHANGE_VALUE, outputValueListener);
		function outputValueListener(e)
		{
			this._listOfChangedValue.push(e.target);
		}
	}
	BaseModel.prototype.updateEvents = function()
	{
		if(this._listOfChangedValue.length != 0)
			this.dispatchEvent(new BaseModelEvent(BaseModelEvent.CHANGE_VALUE));
		this._listOfChangedValue = [];
		this._listOfChangedSign = [];
	}
	BaseModel.prototype.getListOfOutputs = function()
	{
		return this._listOfOutputs;
	}
	BaseModel.prototype.getListOfChangedValue = function()
	{
		return this._listOfChangedValue;
	}
	BaseModel.prototype.getListOfChangedSign = function()
	{
		return this._listOfChangedSign;
	}
	BaseModel.prototype.getTime = function()
	{
		return this.time.getValue();
	}
	BaseModel.prototype.addTime = function(t)
	{
		if(!this.time.getValue())
			this.time.setValue(t);
		else
			this.time.setValue(this.time.getValue()+t);
	}
	BaseModel.prototype.resetTime = function()
	{
		this.time.setValue(0);
	}
})();