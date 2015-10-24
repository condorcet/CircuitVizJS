(function()
{
	CircuitViz.visualization.Segment = function(p1,p2)
	{
		this._point1;
		this._point2;
		this._angle;
		this._length;
		this.id = this._id;
		this._id++;
		this.setPoints(p1,p2);
	}
	var Segment = CircuitViz.visualization.Segment;
	
	Segment.prototype.getLength = function()
	{
		return this._length;
	}
	Segment.prototype.getAngle = function()
	{
		return this._angle;
	}
	Segment.prototype.setPoints = function(p1,p2)
	{
		this._point1 = p1;
		this._point2 = p2;
		this._calcAngle();
		this._calcLength();
	}
	Segment.prototype.setPoint1 = function(p)
	{
		this._point1 = p;
		this._calcAngle();
		this._calcLength();
	}
	Segment.prototype.setPoint2 = function(p)
	{
		this._point2 = p;
		this._calcAngle();
		this._calcLength();
	}
	Segment.prototype.getPoint1 = function()
	{
		return this._point1;
	}
	Segment.prototype.getPoint2 = function()
	{
		return this._point2;
	}
	Segment.prototype._calcAngle = function()
	{
		this._angle = Math.atan2(this._point2.y-this._point1.y,this._point2.x-this._point1.x);
	}
	Segment.prototype._calcLength = function()
	{
		this._length = Math.sqrt(Math.pow(this._point2.x-this._point1.x,2)+Math.pow(this._point2.y-this._point1.y,2));
	}
})();	