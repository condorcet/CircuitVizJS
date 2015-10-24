(function()
{
	var Particle = CircuitViz.visualization.Particle;
	CircuitViz.visualization.Chain = function(list)
	{
		createjs.Container.apply(this, arguments);
		if(list)
			this._listOfSegments = list;
		else
			this._listOfSegments = [];
		this._particleBuffer = [];
		this.id = CircuitViz.visualization.Chain._id;
		CircuitViz.visualization.Chain._id++;
		this._deltaDistance = 20;
		this._listOfparticles;
		this._speed;
		this._speedDefined = false;
		this._enableBuffer = true;
		this._chainLength = 0;
		this._minLength;
		this._firstParticle;
	}
	
	var Chain = CircuitViz.visualization.Chain;
	Chain.prototype = Object.create(createjs.Container.prototype);
	Chain.prototype.constructor = Chain;
	
	Chain._id = 0;
	
	Chain.prototype.addSegment = function(s)
	{
		for(var i=0; i<this._listOfSegments.length; i++)
			if(this._listOfSegments[i] == s)
				return;
		this._listOfSegments.push(s);
	}
	Chain.prototype.removeSegments = function()
	{
		this._listOfSegments = null;
		this.removeParticles();
	}
	Chain.prototype.createParticles = function()
	{
		if(this._listOfparticles)
			this.removeParticles();
		this._listOfParticles = [];
		var particle;
		var segment;
		var diff = 0;
		var countOfParticles = 0;
		particle = new Particle(0,0)
		this._firstParticle = particle;
		particle.checkFirst(true);
		this._minLength = this._listOfSegments[0].getLength();
		for(var i=0; i<this._listOfSegments.length; i++)
		{
			segment = this._listOfSegments[i];
			this._chainLength += segment.getLength();
			if(this._minLength > segment.getLength())
				this._minLength = segment.getLength();
			particle.setSegment(segment);
			particle.move(diff);
			countOfParticles = 1;
			while(Math.abs(distance(segment.getPoint1(),{x: particle.x,y: particle.y})+distance({x: particle.x,y: particle.y},segment.getPoint2())-segment.getLength()) < 0.1)
			{
				this._listOfParticles.push(particle);
				this.addChild(particle);
				particle = new Particle(0,0);
				particle.setSegment(segment);
				particle.move(countOfParticles*this._deltaDistance+diff);
				countOfParticles++;
			}
			diff = distance({x:particle.x, y:particle.y}, segment.getPoint2());
		}
	}
	Chain.prototype.removeParticles = function()
	{
		for(var i=0; i<this._listOfParticles.length; i++)
			this.removeChild(this._listOfParticles[i]);
		this._listOfParticles = null;
	}
	Chain.prototype.nextStep = function()
	{
		if(!this._speedDefined)
			return;
		var particle;
		var segment;
		var dx,dy,diff = 0;
		var objBuffer;
		if(this._enableBuffer && this._particleBuffer.length != 0)
		{
			segment = this._listOfSegments[0];
			var diff = this._firstParticle.getOffset()-this._deltaDistance;
			if(this._speed < 0)
				diff = segment.getLength()-this._firstParticle.getOffset()-this._deltaDistance;
			if(diff >= 0)
			{
				objBuffer = this._particleBuffer.pop();
				particle = objBuffer.particle;
				var adr = objBuffer.adress;
				particle.setSegment(segment);
				particle.move(this._firstParticle.getOffset()-this._deltaDistance*this._speed/Math.abs(this._speed));
				this._firstParticle.checkFirst(false);
				this._firstParticle = particle;
				this._firstParticle.checkFirst(true);
				this._listOfParticles[adr] = particle;
				particle.visible = true;
			}
		}
		for(var i=0; i<this._listOfParticles.length; i++)
		{
			particle = this._listOfParticles[i];
			if(particle == null)
				continue;
			segment = particle.getSegment();
			dx = Math.cos(segment.getAngle())*this._speed;
			dy = Math.sin(segment.getAngle())*this._speed;
			if(particle.getOffset()+this._speed >= 0 && particle.getOffset()+this._speed <= segment.getLength())
				particle.move(this._speed);
			else
			{
				var j;
				var finded = false;
				for(j=0; j < this._listOfSegments.length; j++)
					if(this._listOfSegments[j] == segment)
					{
						finded = true;
						break;
					}
				var prevSegment = segment;
				if(j+1 <= this._listOfSegments.length-1)
					segment = this._listOfSegments[j+1];
				else
				{
					segment = this._listOfSegments[0];
					if(this._enableBuffer)
					{
						objBuffer = new Object();
						objBuffer.particle = particle;
						objBuffer.adress = i;
						this._particleBuffer.push(objBuffer);
						particle.visible = false;
						this._listOfParticles[i] = null;
						particle.setSegment(segment);
						continue;
					}
				}
				particle.setSegment(segment);
				if(this._speed < 0)
				{
					diff = distance(prevSegment.getPoint1(), {x: particle.x+dx, y: particle.y+dy});
					particle.move(segment.getLength()-diff);
				}
				else
				{
					diff = distance(prevSegment.getPoint2(), {x:particle.x+dx, y:particle.y+dy});
					particle.move(diff);
				}
			}
		}
	}
	
	Chain.prototype.setSpeed = function(newSpeed)
	{
		if(this._speedDefined && (this._speed * newSpeed < 0 || this._speed == 0 && (newSpeed < 0 || newSpeed > 0)) || !this._speedDefined && newSpeed < 0)
		{
			if(this._listOfParticles != null)
				this._changeSpeed(newSpeed);
		}
		this._speedDefined = true;
		if(newSpeed == 0)
		{
			this._speedDefined = false;
			if(this._speed < 0)
				this._changeSpeed(0.1);
		}
		this._speed = newSpeed;
	}
	
	Chain.prototype._changeSpeed = function(newSpeed)
	{
		var lastParticle = this._findLastParticle(newSpeed);
		this._firstParticle.checkFirst(false);
		this._firstParticle = lastParticle;
		this._firstParticle.checkFirst(true);
		this._listOfSegments.reverse();
	}
	
	Chain.prototype.getSpeed = function()
	{
		return speed;
	}
	
	Chain.prototype._findLastParticle = function(newSpeed)
	{
		var lastSegment = this._listOfSegments[this._listOfSegments.length-1];
		var offset = lastSegment.getLength();
		var min = lastSegment.getLength();
		if(newSpeed > 0)
			offset = 0;
		var particle;
		for(var i=0;i<this._listOfParticles.length;i++)
		{
			if(this._listOfParticles[i] == null)
				continue;
			if(this._listOfParticles[i].getSegment().id != lastSegment.id)
				continue;
			if(Math.abs(offset-this._listOfParticles[i].getOffset()) <= min)
			{
				min = Math.abs(offset-this._listOfParticles[i].getOffset());
				particle = this._listOfParticles[i];
			}
		}
		return particle;
	}
	
	Chain.prototype.setDeltaDistance = function(dist)
	{
		this._deltaDistance = dist;
	}
	
	function distance(p1,p2)
	{
		return Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2));
	}
	
})();		
