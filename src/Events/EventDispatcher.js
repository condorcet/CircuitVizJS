(function()
{
	CircuitViz.events.EventDispatcher = 
	{
		listeners: {},
		addEventListener: function(eventType, handler)
		{
			if (!this.listeners) this.listeners = {};
				if (!this.listeners[eventType])
				{
					this.listeners[eventType] = [];
				}
				this.listeners[eventType].push(handler);
		},
		removeEventListener: function(eventType, handler)
		{
			var handlers = this.listeners && this.listeners[eventType];
			if (!handlers) return;
			for(var i=0; i<handlers.length; i++)
			{
			  if (handlers[i] == handler)
				handlers.splice(i--, 1);
			}
		},
		dispatchEvent: function(event)
		{
			if(!this.listeners || !this.listeners[event.type])
				return;
			event.target = this;
			var handlers = this.listeners[event.type];
			for (var i = 0; i < handlers.length; i++)
			{
				handlers[i].apply(this, [].slice.call(arguments, 0));
			}
		}
		
		
	};
})();