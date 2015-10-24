(function()
{
	CircuitViz.visualization.Particle = function(x,y)
	{
		createjs.Container.apply(this, arguments);
		this.id = CircuitViz.visualization.Particle._count++;
		this._draw();
		this.x = x;
		this.y = y;
		this._offset = 0;
		this._segment;
	}
	var Particle = CircuitViz.visualization.Particle;
	Particle.prototype = Object.create(createjs.Container.prototype);
	Particle.prototype.constructor = Particle;
		
	Particle.prototype.move = function(speed)
	{
		this._offset += speed;
		this.x = this._segment.getPoint1().x + Math.cos(this._segment.getAngle())*this._offset;
		this.y = this._segment.getPoint1().y + Math.sin(this._segment.getAngle())*this._offset;
	}
	Particle.prototype.setSegment = function(segment)
	{
		this._segment = segment;
		this._offset = 0;
	}
	Particle.prototype.getSegment = function()
	{
		return this._segment;
	}
	Particle.prototype.getOffset = function()
	{
		return this._offset;
	}
	Particle.prototype.setOffset = function(off)
	{
		this._offset = off;
	}
	Particle.prototype._draw = function()
	{
		
		var particleColor = '#FA0000';
		for(var i in this.children)
		{
			this.removeChild(this.children[i]);
		}
		if(this._debugMode)
		{
			var txtField = createjs.Text(this.id);
			this.addChild(txtField);
			if(this._firstParticle)
				particleColor = '#0000FA';
		}
		var circle = new createjs.Graphics().s('#AF0000').f('#ff0000').dc(0,0,Particle.particleWidth/2).ef();
		var shape = new createjs.Shape(circle);
		this.addChild(shape);	
	}
	Particle.prototype.checkFirst = function(cf)
	{
		if(this._debugMode)
			this._firstParticle = cf;
		this._draw();
	}
	Particle._count = 0;
	Particle.particleWidth = 5
	Particle._debugMode = false;
	Particle._firstParticle = false;
	
})();
