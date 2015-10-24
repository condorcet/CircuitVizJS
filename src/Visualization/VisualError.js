(function()
{
	CircuitViz.visualization.VisualError = function(property)
	{
	  Error.call(this, property) ;
	  this.name = "VisualError";

	  this.property = property;
	  this.message = "Visualization error: " + property;

	  if (Error.captureStackTrace) {
		Error.captureStackTrace(this, VisualError);
	  } else {
		this.stack = (new Error()).stack;
	  }
	}
	var VisualError = CircuitViz.visualization.VisualError;
	VisualError.prototype = Object.create(Error.prototype);
})();
